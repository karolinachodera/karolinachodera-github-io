var startListForm = $(".start-list");
var list = $(".list");
var addItemForm = $(".add-item");
var taskList = $(".task-list");

list.hide();
addItemForm.hide();
taskList.hide();

var startButton = $(".create");
var addButton = $(".add");
var saveButton = $(".save");
var cancelButton = $(".cancel");
var checkButton;
var removeButton;

function showHide (show, hide, ms) {
	hide.hide();
	show.fadeIn(ms);
};

function moveToEnd(element) {
	element.parentNode.append(element);
}

function checkTask(e) {
	var button = e.target;
	var span = button.nextElementSibling;
	button.classList.toggle("checked");
	button.classList.toggle("unchecked");
	span.classList.toggle("strike");
	if(button.classList.contains("checked")) {
		moveToEnd(button.parentNode);
	}
}

function removeTask(e) {
	var listElement = e.target.parentNode;
	listElement.remove();
}

function addItem () {
	var inputTask = $("[name='task']").val();

	if(inputTask) {
		taskList.prepend($("<li class='item'><button class='check unchecked'></button><span>" + inputTask + "</span><button class='remove'></button></li>"));
		var checkButton = $(".task-list li:first-child .check");
		var removeButton = $(".task-list li:first-child .remove");
		checkButton.on("click", checkTask);
		removeButton.on("click", removeTask);
		taskList.fadeIn(500);
		inputTask = $("[name='task']").val("");
	} else {
		taskList.fadeIn(500);
	}
}

startButton.on("click", function () {
	var inputName = $("[name='your-name']").val();
	var inputTitle = $("[name='list-title']").val();
	$(".list h3").html(inputTitle);
	if(inputName) {
		$("header h2").html("Hello, " + inputName);
	} else {
		$("header h2").html("Hello!");
	}
	
	showHide(list, startListForm, 500);
});

addButton.on("click", function () {
	showHide(addItemForm, list, 500);
});

saveButton.on("click", function () {
	addItem();
	showHide(list, addItemForm, 500);
});

cancelButton.on("click", function () {
	showHide(list, addItemForm, 500);
});


