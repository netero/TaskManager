taskManager={
	init:function(elem){
		var category=$(elem).prop("class");
		$(elem).find(".addTask").on("click",function(){
			var task={
				id:0,
				name:'',
				priority:1,
				category:category
				
			}
			taskManager.add(task);
		});
		$(elem).find(".selectAll").on("click",function(){
			taskManager.selAll(category);
		});
		$(elem).find(".selectNon").on("click",function(){
			taskManager.selNon(category);
		});
		$(elem).find(".cleanTasks").on("click",function(){
			taskManager.clean(category);
		});
		$(elem).find(".prevStep").on("click",function(){
			taskManager.prevOrNextStep(category,false);
		});
		$(elem).find(".nextStep").on("click",function(){
			taskManager.prevOrNextStep(category,true);
		});
	},
	categoryOrden:function(category,needNext){
		var categories=[
			{
				id:0,
				nombre:"pending"
			},
			{
				id:1,
				nombre:"working"
			},
			{
				id:2,
				nombre:"completed"
			}
		]
		
		var newCategory;
		
		$.each(categories,function(i,elem){
			if(elem.nombre==category){
				if(needNext){
					newCategory= categories[i+1].nombre;
				}
				else{
					newCategory= categories[i-1].nombre;
				}
			}
		});
		
		return newCategory;
	},
	add:function(task){
		
		var newTask='<tr class="task">'+
						'<td><input type="checkbox" value="'+task.id+'"/></td>'+
						'<td>'+
							'<textarea name="txtTaskName">'+task.name+'</textarea>'+
						'</td>'+
						'<td>'+
							'<select name="slsPriority">'+
								'<option value="0">Sel..</option>'+
								'<option value="1">Alta</option>'+
								'<option value="2">Media</option>'+
								'<option value="3">Baja</option>'+
							'</select>'+
						'</td>'+
					'</tr>';
		$("."+task.category+" tbody").append($(newTask));
		$("."+task.category+" tr:last-child select").val(task.priority);
		$("."+task.category+" tr:last-child textarea").elastic();
	},
	selAll:function(category){
		$("."+category+" input[type=checkbox]").prop("checked",true);
	},
	selNon:function(category){
		$("."+category+" input[type=checkbox]").prop("checked",false);
	},
	clean:function(category){
		$("."+category+" input[type=checkbox]:checked").each(function(i){
			$(this).parent().parent().remove();
		});
	},
	prevOrNextStep:function(category,needNext){
		var newCategory=taskManager.categoryOrden(category,needNext);
		$("."+category+" input[type=checkbox]:checked").each(function(i){
			var valText=$(this).parent().parent().find("textarea").val();
			var valSel=$(this).parent().parent().find("select").val();
			var newRow=$(this).parent().parent().clone();
			$(newRow).find("textarea").val(valText);
			$(newRow).find("select").val(valSel);
			$("."+newCategory+" tbody").append($(newRow));
			$(this).parent().parent().remove();
			$("."+newCategory+" tr:last-child textarea").elastic();
		});
	},
	loadTask:function(taskString){
		//getting json
		var tasksJson=$.parseJSON(taskString);
		//cleaning everything
		taskManager.selAll("pending");
		taskManager.selAll("working");
		taskManager.selAll("completed");
		taskManager.clean("pending");
		taskManager.clean("working");
		taskManager.clean("completed");
		for(var i=0;i<tasksJson.length;i++){
			taskManager.add(tasksJson[i]);
		}
		
	},
	getAllTasks:function(){
		var taskArray= new Array();
		
		$(".task").each(function(i){
			taskArray[taskArray.length]={
				"id":i,
				"name":$(this).find("textarea").val(),
				"priority":$(this).find("select").val(),
				"category":$(this).parent().parent().parent().parent().prop("class")
			};
		});
		return JSON.stringify(taskArray);
		
	}
	
};