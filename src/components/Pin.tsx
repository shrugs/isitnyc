import React from "react";

function Pin() {
	return (
		<span className="relative flex h-3 w-3">
			<span className="animate-ping duration-2000 absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
			<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
		</span>
	);
}

export default React.memo(Pin);
