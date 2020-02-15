import axios from 'axios';

let template =
/*html*/`<li class="task" :class="{ selected: this.isDone }" v-on:mouseover="showDelete = true" v-on:mouseleave="showDelete = false" >
			<input type="checkbox" v-on:change="toggleDone" class="u-visually-hidden task__input" :id="taskID" :name="taskID" v-on:focusin="showDelete = true" />
			<label :for="taskID" class="task__title" :class="classList">{{ title }}</label>
			<button type="button" class="task__delete" v-if="showDelete" v-on:click="deleteTask" v-on:focusout="showDelete = false" v-on:keydown.enter="$event.stopPropagation()"><span class="u-visually-hidden">Delete this task</span></button>
		</li>`;

export let Task = {
	props: ['title', 'id', 'importance', 'isDoneInitial'],	
	data: function() {
		return {
			isDone: this.isDoneToBoolean(),
			showDelete: false
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
		},
		deleteTask: function() {
			axios
			.delete(
				'http://localhost:4000/api/task/' + this.id
			)
			.then(() => {
				this.$emit('deleted', true);
			})
			.catch((error) => {
				console.log('error - unable to load data file');
				console.log(error);
			});	
		}
	},
	template: template,
};
