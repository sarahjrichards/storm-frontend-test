import axios from 'axios';

let template =
/*html*/`<li class="task" :class="{ selected: this.isDone }">
			<input type="checkbox" v-on:change="toggleDone" class="u-visually-hidden task__input" :id="taskID" :name="taskID"/>
			<label :for="taskID" class="task__title" :class="classList">{{ title }}</label>
		</li>`;

export let Task = {
	props: ['title', 'id', 'importance', 'isDoneInitial'],	
	data: function() {
		return {
			isDone: this.isDoneToBoolean()
		}
	},
	computed: {
		taskID() {
			return "task-" + this.id; 
		},
		classList() {
			let classList = "task--importance-" + this.importance;
			return classList;
		}
	},
	methods: {
		toggleDone: function() {
			this.isDone = !this.isDone;
			axios
			.patch(
				'http://localhost:4000/api/task/' + this.id, 
				{ isDone: this.isDoneToString() }
			)
			.then(() => {
				console.log("success");
			})
			.catch((error) => {
				console.log('error - unable to load data file');
				console.log(error);
			});	
		},
		isDoneToBoolean() {
			return (this.isDoneInitial === 'true');
		},
		isDoneToString() {
			if (this.isDone) {
				return "true";
			} else {
				return "false";
			}
		}
	},
	template: template,
};
