document.addEventListener('DOMContentLoaded',showTable);
document.getElementById("add").addEventListener('click',addIt);
document.getElementById('upData').addEventListener('click',upIt);
document.getElementById("upClose").addEventListener('click',hideUpdate);
document.getElementById('updateExercise').style.display = 'none';


function addIt() {
	
	var ename = document.getElementById('name').value;
	if(!ename) {
		alert("Please enter a name for your exercise");
		event.preventDefault();
		return;
	}
	var ereps = document.getElementById('reps').value;
	var eweight = document.getElementById('weight').value;
	var edate = document.getElementById('date1').value;
	if (document.getElementById('unit0').checked)
			var eunit = document.getElementById('unit0').value;
		else
			var eunit = document.getElementById('unit1').value;
	
	var payload = {
			name: ename,
			reps: ereps,
			weight: eweight,
			date: edate,
			lbs: eunit
		};

	var req = new XMLHttpRequest();
	
	var url = '/insert';
	
	req.open('POST',url,true);
	 req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400) {
			var response = req.responseText;
			showTable();
		}
		else 
			console.log('err');
	});
	
	req.send(JSON.stringify(payload));
	event.preventDefault();
}

function upIt(){
	var ename = document.getElementById('upName').value;
		if(!ename) {
		alert("Please enter a name for your exercise");
		event.preventDefault();
		return;
	}
	var ereps = document.getElementById('upReps').value;
	var eweight = document.getElementById('upWeight').value;
	var edate = document.getElementById('upDate').value;
	if (document.getElementById('upUnit0').checked)
			var eunit = document.getElementById('upUnit0').value;
		else
			var eunit = document.getElementById('upUnit1').value;
	var eid = document.getElementById('upId').value;
	
	var payload = {
			id: eid,
			name: ename,
			reps: ereps,
			weight: eweight,
			date: edate,
			lbs: eunit
		};
		
	var req = new XMLHttpRequest();
	
	var url = '/update';
	
	req.open('POST',url,true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400) {
			var response = req.responseText;
			showTable();
		}
		else 
			console.log('err');
	});
	
	req.send(JSON.stringify(payload));
	event.preventDefault();
	
	hideUpdate();
	
}

function showTable(){
	var req = new XMLHttpRequest();

	req.open('GET', 'http://flip1.engr.oregonstate.edu:4300/',true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
		
		var db = document.getElementById('dataBody');
		while (db.hasChildNodes())
			db.removeChild(db.firstChild)
		
		if (response != "")
	{
		for (var i in response)
		{			
			var newRow = document.createElement("tr");
			newRow.id = response[i].id;
			db.appendChild(newRow);
			
			var newCell = document.createElement("td");
			newCell.textContent = response[i].name;
			newRow.appendChild(newCell);
			
			newCell = document.createElement("td");
			newCell.textContent = response[i].reps;
			newRow.appendChild(newCell);
			
			newCell = document.createElement("td");
			newCell.textContent = response[i].weight;
			newRow.appendChild(newCell);
			
			newCell = document.createElement("td");
			if (response[i].lbs)
				newCell.textContent = "lbs";
			else
				newCell.textContent = "kgs";
			newRow.appendChild(newCell);
			
			newCell = document.createElement("td");
			newCell.textContent = response[i].date;
			newRow.appendChild(newCell);
			
			newCell = document.createElement("td");
			var newInput = document.createElement("button");
			newInput.setAttribute("type", "button");
			newInput.textContent = "Update";
			newInput.value = response[i].id;
			newInput.addEventListener('click', function(){openUpdate(this);});
			newCell.appendChild(newInput);
			newRow.appendChild(newCell);
			
			newCell = document.createElement("td");
			newInput = document.createElement("button");
			newInput.setAttribute("type", "button");
			newInput.textContent = "Delete";
			newInput.value = response[i].id;
			newInput.addEventListener('click', function(){deleteData(this);});
			newCell.appendChild(newInput);
			newRow.appendChild(newCell);
		}
	}
	}
	else 
			console.log('err');
	});
	
	req.send(null);
	event.preventDefault;
}

function openUpdate(rowElements){
	document.getElementById('updateExercise').style.display = 'block';
	
	var upRow = document.getElementById(rowElements.value);
	
	document.getElementById("upId").value = rowElements.value;
	document.getElementById("upName").value = upRow.cells[0].innerHTML;
	document.getElementById("upReps").value = upRow.cells[1].innerHTML;
	document.getElementById("upWeight").value = upRow.cells[2].innerHTML;
	document.getElementById("upDate").value = upRow.cells[4].innerHTML;
	if (upRow.cells[3].innerHTML == "lbs")
		document.getElementById("upUnit1").checked = true;
	else
		document.getElementById("upUnit0").checked = true;
}

function deleteData(rowDel) {
	var delId = rowDel.value;
	
	var payload = {
		id: delId
	};
	
	var req = new XMLHttpRequest();
		
	var url = '/delete';
	
	req.open('POST',url,true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400) {
			var response = req.responseText;
			showTable();
		}
		else 
			console.log('err');
	});
	
	req.send(JSON.stringify(payload));
	event.preventDefault();
}

function hideUpdate(){
	document.getElementById('updateExercise').style.display = 'none';
}

