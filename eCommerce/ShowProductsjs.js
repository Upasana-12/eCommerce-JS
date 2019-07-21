var cart=[];
var nodeId=0;
var arrayId=0;
var showProducts=document.getElementById("showProducts");
var sto=localStorage.getItem("data");
//console.log(sto);
var store=JSON.parse(sto);
//console.log(store);

for(var i=0;i<store.length;i++)
{
	makeDiv(store[i]);
}
function makeDiv(obj)
{
	var node=document.createElement("li");
	node.setAttribute("id",nodeId);
	nodeId++;
	
	var name=document.createElement("label");
	name.setAttribute("id","Pname");
	name.innerHTML="Product NAME: "+obj.Name;
	node.appendChild(name);
	insertBlankLine(name);
	//insertBlankLine(name);
	
	var desc=document.createElement("label");
	desc.setAttribute("id","Pdesc");
	desc.innerHTML="Product DESCRIPTION: "+obj.Desc;
	node.appendChild(desc);
	insertBlankLine(desc);
	
	var p=document.createElement("label");
	p.setAttribute("id","Pp");
	p.innerHTML="Product PRICE: "+obj.Price;
	node.appendChild(p);
	insertBlankLine(p);
	
	var qty=document.createElement("label");
	qty.setAttribute("id","Pqty");
	qty.innerHTML="Product QUANTITY: "+obj.Quantity;
	node.appendChild(qty);
	insertBlankLine(qty);
	
	var q_input=document.createElement("input");
	q_input.setAttribute("type","text");
	q_input.setAttribute("placeholder","Enter Quantity");
	q_input.setAttribute("id","Pquantity");
	q_input.setAttribute("style","width:250px");
	q_input.setAttribute("style","height:43px");
	node.appendChild(q_input);
	insertBlankLine(q_input);
	
	var add_btn=document.createElement("button");
	add_btn.setAttribute("id","add_btn");
	add_btn.innerHTML="Add to Cart";
	node.appendChild(add_btn);
	insertBlankLine(add_btn);
	insertBlankLine(add_btn);
	//showProducts.appendChild(node);
	
	insertBlankLine(node);
	insertBlankLine(node);
	add_btn.addEventListener("click",function(event)
									{
										if(q_input.value<=0 || q_input.value>parseInt(obj.Quantity) || q_input.value=="")
										{
											alert("Sorry! This quantity is not available");
										}
										else
										{
											obj.Quantity=obj.Quantity-q_input.value;
											update_shop();
											node.removeChild(add_btn);
											var parent=event.target.parentNode;
											addToArrayAndCart(obj,q_input.value);
										}
									});
	showProducts.appendChild(node);								
	
}
function update_shop()
{
	var u=JSON.stringify(store);
	localStorage.setItem("data",u);
}
function addToArrayAndCart(obj,q_val)
{
	var ProObj=new Object();
	ProObj.Id=arrayId;
	console.log(ProObj.Id);
	ProObj.Name=obj.Name;
	console.log(ProObj.Name);
	ProObj.Price=obj.Price;
	console.log(ProObj.Price);
	//ProObj.Quantity=document.getElementById("Pquantity").value;
	ProObj.Quantity=q_val;
	console.log(ProObj.Quantity);
	cart.push(ProObj);
	storeValue();
	arrayId++;
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function storeValue()
{
	var product=JSON.stringify(cart);
	localStorage.setItem("keyCart",product);
}