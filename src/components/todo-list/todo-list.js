import Vue from 'vue/dist/vue.common.js';
import axios from 'axios';

import { Task } from '../task/task.js';

let template =/*html*/`
		<ul>
			<Task v-for="task in this.tasks" :title="task.title"/>
		</ul>
`;

export let ToDo = {
	data: function() {
		return {
			tasks: []
		}
	},
	mounted () {
		axios
		.get('http://localhost:4000/api/task')
		.then((response) => {
			this.tasks = response.data;
			console.log(this.tasks);
		})
		.catch((error) => {
			console.log('error - unable to load data file');
			console.log(error);
		});	
	},
	components: {
		Task
	},
	template: template,
};
