var nodeId=0;
var checkout_list=document.getElementById("checkout_list");
var gt=document.getElementById("total");
var grand_total=0;
var a=localStorage.getItem("keyCart");
var arr=JSON.parse(a);
var pro=localStorage.getItem("data");
var products=JSON.parse(pro);
var ele=document.createElement("label");
for(var i=0;i<arr.length;i++)
{
		make_list(arr[i]);
}

function make_list(obj)
{
	var node=document.createElement("li");
	node.setAttribute("id",nodeId);
	nodeId++;
	
	var name=document.createElement("label");
	name.setAttribute("id","Pname");
	name.innerHTML="Product NAME: "+obj.Name;
	node.appendChild(name);
	insertBlankLine(name);
	
	var quantity=document.createElement("label");
	quantity.setAttribute("id","Pquantity");
	quantity.innerHTML="Product QUANTITY: "+obj.Quantity;
	node.appendChild(quantity);
	insertBlankLine(quantity);
	
	var price=document.createElement("label");
	price.setAttribute("id","Pprice");
	price.innerHTML="Product PRICE: "+obj.Price;
	node.appendChild(price);
	insertBlankLine(price);
	
	var total=document.createElement("label");
	total.setAttribute("id","Ptotal");
	total.innerHTML="Product TOTAL: Rs."+parseInt(obj.Quantity)*parseInt(obj.Price);
	grand_total+=parseInt(obj.Quantity)*parseInt(obj.Price);
	console.log(grand_total);
	ele.innerHTML="    Grand Total: Rs. "+grand_total;
	gt.appendChild(ele);
	node.appendChild(total);
	insertBlankLine(total);
	
	var del_btn=document.createElement("button");
	del_btn.setAttribute("id","del");
	del_btn.innerHTML="Remove Item";
	node.appendChild(del_btn);
	insertBlankLine(del_btn);
	checkout_list.appendChild(node);
	del_btn.addEventListener("click",function(event)
									{
										checkout_list.removeChild(node);
										update_qty(parseInt(event.target.parentNode.id));
										arr.splice(parseInt(event.target.parentNode.id),1);
										update_cart();
									});
	
	
	
}

function update_qty(index)
{
	console.log(arr[index].Name);
	for(var i=0;i<products.length;i++)
	{
		if(arr[index].Name==products[i].Name)
		{
			console.log(products[i].Name);
			console.log(products[i].Quantity);
			products[i].Quantity=parseInt(products[i].Quantity)+parseInt(arr[index].Quantity);
			console.log(products[i].Quantity);
			grand_total-=parseInt(arr[index].Quantity)*parseInt(arr[index].Price);
			ele.innerHTML="    Grand Total: Rs. "+grand_total;
			//total.appendChild(ele);
			console.log(grand_total);
			break;
		}
	}
	update_shop();
}

function update_shop()
{
	var u=JSON.stringify(products);
	localStorage.setItem("data",u);
}

function update_cart()
{
	var u=JSON.stringify(arr);
	localStorage.setItem("keyCart",u);
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}