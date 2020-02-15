import axios from 'axios';

import { Task } from '../task/task.js';
import { AddButton } from '../add-button/add-button.js';

let template =/*html*/`
		<section class="container">
			<form class="todo">
				<div class="todo__loading" v-if="this.loading">
					<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
				</div>
				<header class="todo__header">
					<h1 class="todo__header__heading h3"  v-if="!overlayVisible">
						{{ this.header }}
					</h1>
					<AddButton v-on:addition="updateData" v-on:toggleOverlay="toggleOverlay"/>
				</header>
				<section v-if="!overlayVisible">
					<ul class="todo__list">
						<Task v-for="task in this.tasks" v-bind:key="task.id" :title="task.title" :id="task.id" :importance="task.importance" :isDoneInitial="task.isDone" v-on:deleted="updateData"/>
					</ul>
				</section>
			</form>
		</section>
`;

export let ToDo = {
	data: function() {
		return {
			header: "Todo list",
			tasks: [],
			loading: true,
			overlayVisible: false
		}
	},
	mounted () {
		this.updateData();
	},
	methods: {
		updateData: function() {
			axios
			.get('http://localhost:4000/api/task')
			.then((response) => {
				this.tasks = response.data;
				this.loading = false;
			})
			.catch((error) => {
				console.log('error - unable to load data file');
				console.log(error);
			});	
		},
		toggleOverlay: function() {
			this.overlayVisible = !this.overlayVisible
		}
	},
	components: {
		Task,
		AddButton
	},
	template: template,
};
