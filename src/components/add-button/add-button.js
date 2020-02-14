import axios from 'axios';

let template =
/*html*/`<div class="add-button" :class="{'add-button--overlay-open': overlayVisible }">
			<button type="button" class="add-button__button" v-on:click='overlayVisible = !overlayVisible'>Add item</button>
			<div class="add-button__overlay" v-if="overlayVisible">
				<div class="add-button__form">
					<div class="add-button__errors" v-if="errors.length">
						<ul>
							<li class="u-error" v-for="error in errors">{{ error }}</li>
						</ul>
					</div>
					<label class="add-button__form-label" :class="{'u-error': this.checkDirtyTitle}" for="task-title">Enter your task title</label>
					<input v-model="taskTitle" class="add-button__title-input" placeholder="Title here" type="text" id="task-title" name="task-title"/>
					<label class="add-button__form-label" :class="{'u-error': this.checkDirtyImportance}" for="task-importance">Task importance</label>
					<select v-model="taskImportance" name="task-importance" id="task-importance" class="add-button__importance-input" >
						<option value="">Select</option>
						<option value="0">0 - High</option>
						<option value="1">1 - Medium</option>
						<option value="2">2 - Low</option>
					</select>
					<button type="button" class="add-button__button add-button__button--save" v-on:click="saveTask">Save</button>
					<button type="button" class="add-button__button add-button__button--save add-button__button--primary" v-on:click="saveTask" data-addAnother>Save and add another</button>
				</div>
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
		checkDirtyTitle() {
			return this.dirty && (this.taskTitle === ''); 
		},
		checkDirtyImportance() {
			return this.dirty && (this.taskImportance === ''); 
		}
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
				axios
				.post(
					'http://localhost:4000/api/task/', 
					{ 
						title: this.taskTitle,
						importance: this.taskImportance
					}
				)
				.then((response) => {
					this.$emit('addition', true);
					this.errors = [];
					this.taskTitle = '';
					this.taskImportance = '';
					this.dirty = false;

					if (!e.target.hasAttribute('data-addAnother')) {
						this.overlayVisible = false;
					}
				})
				.catch((error) => {
					console.log('error - unable to add task');
					console.log(error);
				});		
			} 
		}
	},
	template: template,
};
