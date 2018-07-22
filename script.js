function checkEmail() {
	let email=document.querySelector("#id_email").value;
	
	if(!email || email==="") {
		alert("Bank Value supplied");
		return;
	}
	
	let queryURL = "http://localhost:4000/" + email;
	
	fetch(queryURL)
	.then(function(response) {
		return response.json();
	})
	.then (function (result) {
		displayEmailResult(result);
	})
	.catch(function(error) {
		console.log(error.message);
	});
}

function displayEmailResult(result) {
	$('#emailModal').modal('hide');
	let msgDiv=document.querySelector("#message");
	let div=document.querySelector("#result");
	
	if(result.message) {
		div.innerHTML="";
		msgDiv.innerHTML=`<div class=" alert alert-success alert-dismissible" role="alert"> \
							<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
							<strong>Good News!</strong>Your email address is never hacked.\
						  </div>`;
							
	}

	
	else {
				msgDiv.innerHTML=`<div class=" alert alert-danger alert-dismissible" role="alert"> \
							<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
							<strong>Hacked!</strong>Better check yourself,you\'re not lookiing too good.\
						  </div>`;
	}
	
		div.innerHTML="";
	var i=0;
	result.forEach(function(currentResult) {
		let hackedHTMLDiv= `<div class="jumbotron" id="id_${i}"> \
								<div class="row">
								<div class="col-xs-12 col-sm-4">
									<h5>${currentResult.Title}:<small><a target="_blank" href="${currentResult.Domain}">website</a></small></h5>
									<h5>Breach Date:<small>${currentResult.BreachDate}</small></h5>
									<h5>Added:<small>${currentResult.AddedDate}</small></h5>
									<h5>Modified:<small>${currentResult.ModifiedDate}</small></h5>
								</div>
								<div class="col-xs-12 col-sm-8">
								<h5>${currentResult.Name}</h5>
								<p>${currentResult.Description}</p>
								</div>
						<div class="col-xs-12" id="data_id_${i}">
						<h5>Compromised data</h5>
						</div>
						</div>
						</div>`;
						
						$('#result').append(hackedHTMLDiv);
						
						currentResult.DataClasses.forEach(function(currentDataClass) {
							
							$('#data_id_${i}').append('<span class="label label-danger danger-label">${currentDataClass}</span>');
							
						});
						i++;
	});
	console.log(result);
	}

					
									
			
									
	