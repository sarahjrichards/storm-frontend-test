import Vue from 'vue/dist/vue.common.js';
import axios from 'axios';

import { Task } from '../task/task.js';

let template =/*html*/`
		<section class="container">
			<div class="todo">
				<h1 class="todo__header h3">
					{{ this.header }}
				</h1>
				<ul class="todo__list">
					<Task v-for="task in this.tasks" v-bind:key="task.id" :title="task.title"/>
				</ul>
			</div>
		</section>
`;

export let ToDo = {
	data: function() {
		return {
			header: "Todo list",
			tasks: []
		}
	},
	mounted () {
		axios
		.get('http://localhost:4000/api/task')
		.then((response) => {
			this.tasks = response.data;
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
