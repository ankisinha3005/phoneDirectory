window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var name = document.getElementById('name');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var phoneDirectory = [];

	//localStorage['addbook'] = '[{"fullname":"Sachin B","email":"sachin@frameboxx.in","phone":"93828292","address":"something","city":"Chandigarh"}]';

	function jsonStructure(name,phone,email){
		this.name = name;
		this.phone = phone;
		this.email = email;
	}

	function addToBook(){
		var isNull = name.value!='' && phone.value!='' && email.value!='';
		//isNull=true;
        if(isNull){
			// format the input into a valid JSON structure
			var obj = new jsonStructure(name.value,phone.value,email.value);
			phoneDirectory.push(obj);
			localStorage['addbook'] = JSON.stringify(phoneDirectory);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			phoneDirectory.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(phoneDirectory);
			showAddressBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			phoneDirectory = JSON.parse(localStorage['addbook']);
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			for(var n in phoneDirectory){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + phoneDirectory[n].name + '</p></div>';
					str += '<div class="email"><p>' + phoneDirectory[n].email + '</p></div>';
					str += '<div class="phone"><p>' + phoneDirectory[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();
      

}