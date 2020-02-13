import Vue from 'vue/dist/vue.common.js';
import axios from 'axios';

let template =
/*html*/`<li :class="classList">
			<input type="checkbox" class="u-visually-hidden" :id="taskID" :name="taskID"/>
			<label :for="taskID" class="task__title">{{ title }}</label>
		</li>`;

export let Task = {
	props: ['title', 'id', "importance"],
	computed: {
		taskID() {
			return "task-" + this.id; 
		},
		classList() {
			return "task task--importance-" + this.importance;
		}
	},
	template: template,
};
