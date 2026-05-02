export const Background = () => {
  return (
    <>
      <div
        data-testid="grid-background"
        className="fixed inset-0 grid-bg"
        style={{ zIndex: -2 }}
      />
      <div className="spotlight" />
      <div
        data-testid="scanlines-overlay"
        className="scanlines"
        aria-hidden="true"
      />
    </>
  );
};

export default Background;
