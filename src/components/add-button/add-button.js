import axios from 'axios';

let template =
/*html*/`<div class="add-button" :class="{'add-button--overlay-open': overlayVisible }">
			<button type="button" class="add-button__button" v-on:click='overlayVisible = !overlayVisible'>Add item</button>
			<div class="add-button__overlay" v-if="overlayVisible">
				<div class="add-button__errors" v-if="errors.length">
					<ul>
						<li class="u-error" v-for="error in errors">{{ error }}</li>
					</ul>
				</div>
				<label class="u-visually-hidden" for="task-title">Enter your task title</label>
				<input v-model="taskTitle" class="add-button__title-input" :class="{'u-error': this.checkDirty}" placeholder="Task title" type="text" id="task-title" name="task-title"/>
				<label class="add-button__form-label" for="task-importance">Task importance</label>
				<select v-model="taskImportance" name="task-importance" id="task-importance" class="add-button__importance-input" :class="{'u-error': this.checkDirty}">
					<option value="">Select</option>
					<option value="0">0 - High</option>
					<option value="1">1 - Medium</option>
					<option value="2">2 - Low</option>
				</select>
				<button type="button" class="add-button__save-button" v-on:click="saveTask">Save</button>
				<button type="button" class="add-button__save-button" v-on:click="saveTask" data-addAnother>Save and add another</button>
			</div>
		</div>
`;

export let AddButton = {
	data: function() {
		return {
			overlayVisible: false,
			taskTitle: '',
			taskImportance: '',
			errors: [],
			dirty: false
		}
	},
	computed: {
		checkDirty() {
			return this.dirty && (e.target.value === ''); 
		},
	},
	methods: {
		saveTask: function(e) {

			this.errors = [];
			this.dirty = true;

			if (this.taskTitle === '') {
				this.errors.push('Please enter a title');
			}

			if (this.taskImportance === '') {
				this.errors.push('Please select an importance');
			}

			if(this.errors.length === 0) {
				console.log(this.taskTitle, this.taskImportance);
				this.errors = [];
				this.taskTitle = '';
				this.taskImportance = '';
				this.dirty = false;
			} else {
				console.log(this.errors);
			}

			if (!e.target.hasAttribute('data-addAnother')) {
				alert();
				this.overlayVisible = false;
			}
		}
	},
	template: template,
};
