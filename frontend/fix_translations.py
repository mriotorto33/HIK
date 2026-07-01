import re
import os

files = {
    'en': 'src/i18n/en.js',
    'es': 'src/i18n/es.js',
    'pt': 'src/i18n/pt.js'
}

translations = {
    'en': """
  techTabs: { architecture: 'Architecture', cryptographic: 'Cryptographic Core', sdk: 'Integration', compliance: 'Compliance Mapping' },
  techBadges: ['Static Core Binary', 'C2PA 2.3', 'KMIR v1.1', 'Integrity Telemetry', 'Dual-Algorithm Signing', 'EVM + IPFS', 'Serverless Edge', 'K8s Sidecar'],
  complianceRows: [
    { regulation: 'EU AI Act Art. 5(1)(f)', scope: 'Emotion Inference Ban', hikEnforcement: 'Gate 1 blocks emotion-state queries before LLM. Gate 2 blocks emotion-inference outputs. Compliance receipt maps to this article explicitly.' },
    { regulation: 'EU AI Act Art. 50', scope: 'Transparency obligations for AI systems', hikEnforcement: 'Sacred Trace™ receipt provides machine-readable proof of policy applied, timestamp, and decision — satisfying Art. 50 disclosure requirements.' },
    { regulation: 'NYC Local Law 144', scope: 'Automated Employment Decision Tools', hikEnforcement: 'Gate 1 intercepts prohibited hiring queries (emotional state, physical inference). Every interaction produces an LL144-tagged audit receipt.' },
    { regulation: 'GDPR Art. 22', scope: 'Automated individual decision-making', hikEnforcement: 'Anchored receipts provide the explainability trail required for Art. 22 challenges. Merkle proof allows any auditor to verify the decision chain.' },
    { regulation: 'GDPR Art. 5(1)(e)', scope: 'Storage limitation', hikEnforcement: 'Receipts store only query hashes, policy IDs, and decisions — not raw PII. The enforcement record is cryptographically verifiable without retaining personal data.' },
  ],
  cryptographicDesign: {
    title: 'Dual-Algorithm Cryptographic Design',
    desc: 'HIK employs purpose-specific cryptographic algorithms across its enforcement pipeline. Different operations — content provenance, real-time telemetry signing, and compliance receipts — use independently selected algorithms optimized for each threat model and performance requirement. The full cryptographic specification is available to qualified enterprise evaluators under NDA.'
  },
  integrationTab: {
    title: 'HIK Native Enforcement Engine — Drop-in Integration',
    desc: 'The HIK engine acts as a transparent proxy in front of any LLM endpoint. No SDK installation required in your application — point your existing LLM calls at the HIK proxy URL.',
    deploymentTitle: 'Deployment Options',
    options: [
      { title: 'Kubernetes Sidecar', desc: 'Lightweight static binary runs alongside any LLM-serving pod. All LLM traffic passes through the enforcement cascade. HPA-eligible.', tags: ['K8s', 'GKE', 'EKS'] },
      { title: 'Cloud Run / Fargate', desc: 'Container-per-request with auto-scaling to zero. Optimized cold start. No persistent storage required.', tags: ['Cloud Run', 'Fargate', 'Serverless'] },
      { title: 'Chrome Extension', desc: 'Browser-level interception for LLM web interfaces (Gemini, ChatGPT). Evaluates prompts via the enforcement proxy before submission.', tags: ['Chrome Extension', 'Shadow DOM'] },
      { title: 'Edge-Native Serverless (Phase 5)', desc: 'Autonomous enforcement at CDN edge. Embedded telemetry and enforcement logic at edge layer. In active development.', tags: ['In Progress', 'Edge-Native', 'Serverless'] },
    ]
  },
  techUi: { integritySchema: 'Integrity Key Schema', apiEndpoints: 'API Endpoints', regulatoryCoverage: 'Regulatory Coverage', mappingTitle: 'How HIK Maps to Each Regulation', mappingDesc: 'Each HIK enforcement action maps to specific regulatory articles. The Sacred Trace™ receipt explicitly includes the policy ID and article reference — making audit responses mechanical, not interpretive.' },
""",
    'es': """
  techTabs: { architecture: 'Arquitectura', cryptographic: 'Núcleo Criptográfico', sdk: 'Integración', compliance: 'Mapeo de Cumplimiento' },
  techBadges: ['Binario Core Estático', 'C2PA 2.3', 'KMIR v1.1', 'Telemetría de Integridad', 'Firma de Algoritmo Dual', 'EVM + IPFS', 'Serverless Edge', 'Sidecar K8s'],
  complianceRows: [
    { regulation: 'EU AI Act Art. 5(1)(f)', scope: 'Prohibición de Inferencia de Emociones', hikEnforcement: 'Gate 1 bloquea consultas de estado emocional antes del LLM. Gate 2 bloquea salidas de inferencia de emociones. El recibo de cumplimiento mapea explícitamente a este artículo.' },
    { regulation: 'EU AI Act Art. 50', scope: 'Obligaciones de transparencia', hikEnforcement: 'El recibo Sacred Trace™ proporciona prueba legible por máquina de la política aplicada, la marca de tiempo y la decisión, satisfaciendo los requisitos de divulgación del Art. 50.' },
    { regulation: 'NYC Local Law 144', scope: 'Herramientas de Decisión de Empleo Automatizadas', hikEnforcement: 'Gate 1 intercepta consultas de contratación prohibidas. Cada interacción produce un recibo de auditoría etiquetado con LL144.' },
    { regulation: 'GDPR Art. 22', scope: 'Toma de decisiones individual automatizada', hikEnforcement: 'Los recibos anclados proporcionan el rastro de explicabilidad requerido para desafíos del Art. 22. La prueba Merkle permite a cualquier auditor verificar la cadena de decisiones.' },
    { regulation: 'GDPR Art. 5(1)(e)', scope: 'Limitación de almacenamiento', hikEnforcement: 'Los recibos almacenan solo hashes de consulta, IDs de políticas y decisiones, no PII sin procesar. El registro de aplicación es verificable criptográficamente sin retener datos personales.' },
  ],
  cryptographicDesign: {
    title: 'Diseño Criptográfico de Algoritmo Dual',
    desc: 'HIK emplea algoritmos criptográficos específicos para cada propósito en su pipeline de aplicación. Diferentes operaciones utilizan algoritmos seleccionados independientemente, optimizados para cada modelo de amenaza. La especificación criptográfica completa está disponible bajo NDA.'
  },
  integrationTab: {
    title: 'Motor de Aplicación Nativo HIK — Integración Directa',
    desc: 'El motor HIK actúa como un proxy transparente frente a cualquier endpoint LLM. No se requiere instalación de SDK en su aplicación: apunte sus llamadas LLM existentes a la URL del proxy HIK.',
    deploymentTitle: 'Opciones de Despliegue',
    options: [
      { title: 'Sidecar de Kubernetes', desc: 'Binario estático ligero se ejecuta junto a cualquier pod que sirva LLM. Todo el tráfico LLM pasa a través de la cascada de aplicación. Elegible para HPA.', tags: ['K8s', 'GKE', 'EKS'] },
      { title: 'Cloud Run / Fargate', desc: 'Contenedor por solicitud con escalado automático a cero. Arranque en frío optimizado. No se requiere almacenamiento persistente.', tags: ['Cloud Run', 'Fargate', 'Serverless'] },
      { title: 'Extensión de Chrome', desc: 'Intercepción a nivel de navegador para interfaces web LLM. Evalúa prompts a través del proxy de aplicación antes del envío.', tags: ['Chrome Extension', 'Shadow DOM'] },
      { title: 'Serverless Nativo Edge (Fase 5)', desc: 'Aplicación autónoma en el borde CDN. Lógica de telemetría y aplicación integrada en la capa edge. En desarrollo activo.', tags: ['En Progreso', 'Edge-Native', 'Serverless'] },
    ]
  },
  techUi: { integritySchema: 'Esquema de Claves de Integridad', apiEndpoints: 'Endpoints de API', regulatoryCoverage: 'Cobertura Regulatoria', mappingTitle: 'Cómo HIK Mapea a Cada Regulación', mappingDesc: 'Cada acción de aplicación de HIK mapea a artículos regulatorios específicos. El recibo Sacred Trace™ incluye explícitamente el ID de política y referencia de artículo.' },
""",
    'pt': """
  techTabs: { architecture: 'Arquitetura', cryptographic: 'Núcleo Criptográfico', sdk: 'Integração', compliance: 'Mapeamento de Conformidade' },
  techBadges: ['Binário Core Estático', 'C2PA 2.3', 'KMIR v1.1', 'Telemetria de Integridade', 'Assinatura de Algoritmo Duplo', 'EVM + IPFS', 'Serverless Edge', 'Sidecar K8s'],
  complianceRows: [
    { regulation: 'EU AI Act Art. 5(1)(f)', scope: 'Proibição de Inferência de Emoções', hikEnforcement: 'Gate 1 bloqueia consultas de estado emocional antes do LLM. Gate 2 bloqueia saídas de inferência de emoções. O recibo de conformidade mapeia explicitamente para este artigo.' },
    { regulation: 'EU AI Act Art. 50', scope: 'Obrigações de transparência', hikEnforcement: 'O recibo Sacred Trace™ fornece prova legível por máquina da política aplicada, timestamp e decisão, satisfazendo os requisitos de divulgação do Art. 50.' },
    { regulation: 'NYC Local Law 144', scope: 'Ferramentas de Decisão de Emprego Automatizadas', hikEnforcement: 'Gate 1 intercepta consultas de contratação proibidas. Cada interação produz um recibo de auditoria marcado com LL144.' },
    { regulation: 'GDPR Art. 22', scope: 'Tomada de decisão individual automatizada', hikEnforcement: 'Recibos ancorados fornecem a trilha de explicabilidade exigida para desafios do Art. 22. A prova Merkle permite que qualquer auditor verifique a cadeia de decisão.' },
    { regulation: 'GDPR Art. 5(1)(e)', scope: 'Limitação de armazenamento', hikEnforcement: 'Os recibos armazenam apenas hashes de consulta, IDs de políticas e decisões, não PII bruto. O registro de aplicação é criptograficamente verificável sem reter dados pessoais.' },
  ],
  cryptographicDesign: {
    title: 'Design Criptográfico de Algoritmo Duplo',
    desc: 'HIK emprega algoritmos criptográficos específicos em seu pipeline de aplicação. Diferentes operações usam algoritmos selecionados independentemente, otimizados para cada modelo de ameaça. A especificação criptográfica completa está disponível sob NDA.'
  },
  integrationTab: {
    title: 'Motor de Aplicação Nativo HIK — Integração Direta',
    desc: 'O motor HIK atua como um proxy transparente na frente de qualquer endpoint LLM. Nenhuma instalação de SDK necessária na sua aplicação — aponte suas chamadas LLM existentes para o URL do proxy HIK.',
    deploymentTitle: 'Opções de Implantação',
    options: [
      { title: 'Sidecar Kubernetes', desc: 'Binário estático leve executa ao lado de qualquer pod servindo LLM. Todo tráfego LLM passa pela cascata de aplicação. Elegível para HPA.', tags: ['K8s', 'GKE', 'EKS'] },
      { title: 'Cloud Run / Fargate', desc: 'Contêiner por requisição com auto-scaling para zero. Cold start otimizado. Nenhum armazenamento persistente necessário.', tags: ['Cloud Run', 'Fargate', 'Serverless'] },
      { title: 'Extensão do Chrome', desc: 'Interceptação no nível do navegador para interfaces web LLM. Avalia prompts através do proxy de aplicação antes do envio.', tags: ['Extensão do Chrome', 'Shadow DOM'] },
      { title: 'Serverless Nativo Edge (Fase 5)', desc: 'Aplicação autônoma na borda CDN. Lógica de telemetria e aplicação embutida na camada edge. Em desenvolvimento ativo.', tags: ['Em Andamento', 'Edge-Native', 'Serverless'] },
    ]
  },
  techUi: { integritySchema: 'Esquema de Chaves de Integridade', apiEndpoints: 'Endpoints de API', regulatoryCoverage: 'Cobertura Regulatória', mappingTitle: 'Como HIK Mapeia Cada Regulação', mappingDesc: 'Cada ação de aplicação HIK mapeia para artigos regulatórios específicos. O recibo Sacred Trace™ inclui explicitamente o ID da política e referência do artigo.' },
"""
}

for lang, path in files.items():
    p = os.path.join('c:/Users/Martin/HIK/frontend', path)
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "techTabs:" not in content:
        content = content.replace("  ui: {", translations[lang] + "\n  ui: {")
        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {lang}")
