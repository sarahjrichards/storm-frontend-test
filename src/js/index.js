import Vue from 'vue/dist/vue.common.js';
import axios from 'axios';
import { ToDo } from '../components/todo-list/todo-list.js';

{
	console && console.log('%c careers@stormid.com ', 'background: #272727; color: #ffffff');
}

// Create and mount the root instance
new Vue({
	el: '#app',
	components: {
		ToDo
	},
	data: {
		message: 'Hello Vue!'
	},
	template: '<ToDo />',
	methods: {
		
	}
});
