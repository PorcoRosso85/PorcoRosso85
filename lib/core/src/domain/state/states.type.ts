type State = {
	on?: {
		[event: string]:
			| {
					target: string;
					cond?: string;
					actions?: string[];
			  }
			| string;
	};
	initial?: string;
	states?: {
		[subState: string]: State;
	};
	description?: string;
};

type States = {
	[stateName: string]: State;
};

type StateNode = {
	on?: {
		[event in string]?: string | { target: string; guard?: string };
	};
	states?: {
		[state: string]: StateNode;
	};
};

type MachineConfig = {
	id: string;
	initial?: string;
	states: {
		[state: string]: StateNode;
	};
};

// 例: createMachineの使用
// const machineConfig: MachineConfig = {
// 	id: "app",
// 	states: {
// 		"/": {
// 			on: {
// 				click: "/user_account",
// 				// 他のイベントハンドラー...
// 			},
// 			states: {
// 				"/user_account": {
// 					// ...
// 				},
// 				// 他のサブステート...
// 			},
// 		},
// 		// 他のトップレベルステート...
// 	},
// };
