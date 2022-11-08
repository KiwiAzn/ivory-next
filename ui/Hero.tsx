export const Hero: React.FC = () => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-xl">
        <h1 className="font-hero text-9xl font-bold">Ivory</h1>
        <p className="py-6">RPG dice rolling app built for the web</p>
        <div className="input-group">
          <input type="text" className="input-bordered input"></input>
          <button className="btn-primary btn-active btn">
            Create dice room
          </button>
        </div>
      </div>
    </div>
  </div>
);
