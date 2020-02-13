import Vue from 'vue/dist/vue.common.js';
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
		},
		isDoneToBoolean() {
			return (this.isDoneInitial === 'true');
		}
	},
	template: template,
};
