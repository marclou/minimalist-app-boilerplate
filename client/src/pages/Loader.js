const Loader = () => {
  return (
    <div className="w-screen h-screen fixed flex top-0 left-0 items-center justify-center">
      <svg width={38} height={38} xmlns="http://www.w3.org/2000/svg" className="stroke-black dark:stroke-white">
        <g transform="translate(1 1)" strokeWidth={2} fill="none" fillRule="evenodd">
          <circle strokeOpacity={0.5} cx={18} cy={18} r={18} />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
