export default function Loader() {
  return (
    <div className="global-loader">
      <div className="loader-inner">
        <img src="/tajlogo.png" alt="Taj Mahal" className="loader-logo" />
        <div className="loader-progress-track">
          <div className="loader-progress-bar" />
        </div>
        <p className="loader-text">A Legacy of Royal Flavors</p>
      </div>
    </div>
  );
}