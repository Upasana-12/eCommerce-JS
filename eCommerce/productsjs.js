var products=[];
var productId=1;
var aAddProduct=document.getElementById("aAddProduct");
var divAddProduct=document.getElementById("divAddProduct");
var divListProducts=document.getElementById("divListProducts");
retrieveValue();

aAddProduct.addEventListener("click",function(event)
									{
										createNewProductPanel();
									}
							);
							
function createNewProductPanel()
{
	hideAddNewProductLink();
		var lblAddProduct=document.createElement("label");
		lblAddProduct.innerHTML="Add New Product";
		lblAddProduct.setAttribute("style","font-weight:bold");
		divAddProduct.appendChild(lblAddProduct);
		
		insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
	    
		var txtProductName=document.createElement("input");
		txtProductName.setAttribute("type","text");
	    txtProductName.setAttribute("id","txtProductName");
		txtProductName.setAttribute("placeholder", "Enter the product name");	
		txtProductName.setAttribute("style","width:250px");
		divAddProduct.appendChild(txtProductName);	
	
		insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
		
		var txtProductDesc=document.createElement("textarea");
		txtProductDesc.setAttribute("id","txtProductDesc");
		txtProductDesc.setAttribute("placeholder", "Enter the product description");	
		txtProductDesc.setAttribute("style","width:250px ; height:50px");
		divAddProduct.appendChild(txtProductDesc);
	
		insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
		
		var txtProductPrice=document.createElement("input");
		txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);
	
			insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
		
		var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	var btnAddButton=document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML="Add Product";
	divAddProduct.appendChild(btnAddButton);

	btnAddButton.addEventListener("click",function(event)
										{
											addProducttoArray();
										}
								 );
}
function addProducttoArray()
{
		var objProduct=new Object();
		objProduct.Id=productId;
		objProduct.Name=document.getElementById("txtProductName").value;
		console.log(objProduct.Name);
		objProduct.Desc=document.getElementById("txtProductDesc").value;
		console.log(objProduct.Desc);
		objProduct.Price = document.getElementById("txtProductPrice").value;
	    console.log(objProduct.Price);
		objProduct.Quantity = document.getElementById("txtProductQuantity").value;
		console.log(objProduct.Quantity); 
		
		 products.push(objProduct);
		storeValue();
		addProducttoDOM(objProduct);
		deleteNewProductPanel();
		 productId++;
}

function deleteNewProductPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}


function addProducttoDOM(objProduct)
{
	var divProduct=document.createElement("div");
	divProduct.setAttribute("id",productId);
	
	var aProductName=document.createElement("a");
	aProductName.setAttribute("href","#");
	aProductName.setAttribute("id",productId+objProduct.Name);
	console.log(aProductName.id);
	aProductName.innerHTML = objProduct.Name;
	divProduct.appendChild(aProductName);
	//var divNameDesc=document.createElement("div");
	//divNameDesc.innerHTML="";
	//divProduct.appendChild(divNameDesc);
	
	insertBlankLine(divProduct);
	/*
	var lblProductName = document.createElement("label");
	lblProductName.innerHTML = objProduct.Desc;
    divProduct.appendChild(lblProductName);
	
    insertBlankLine(divProduct);
	*/
	var aDelete=document.createElement("a");
	aDelete.setAttribute("href","#");
	aDelete.innerHTML="Delete";
	divProduct.appendChild(aDelete);
	
	insertBlankLine(divProduct);
	
	var aEdit=document.createElement("a");
	aEdit.setAttribute("href","#");
	aEdit.innerHTML="Edit";
	divProduct.appendChild(aEdit);
	
	aDelete.addEventListener("click",function(event)
									{
										var targetParent=event.target.parentNode;
										var index=getProductIndex(parseInt(targetParent.id));
										removeFromProductsArray(index);
										targetParent.parentNode.removeChild(targetParent);
									}
							);
    aProductName.addEventListener("click",function(event)
										{
											//divProduct.appendChild(aProductName);
											var divNameDesc=document.createElement("div");
											//divNameDesc.innerHTML="";
											//divProduct.appendChild(divNameDesc);
											
											var targetParent=event.target.parentNode;
										    var index=getProductIndex(parseInt(targetParent.id));
											var desc=document.createElement("label");
											desc.innerHTML=products[index].Name+" description : "+products[index].Desc;
											divNameDesc.appendChild(desc);
											
											insertBlankLine(desc);
											
											var price=document.createElement("label");
											price.innerHTML=products[index].Name+" price : "+products[index].Price;
											divNameDesc.appendChild(price);
											
											insertBlankLine(price);
											
											var quantity=document.createElement("label");
											quantity.innerHTML=products[index].Name+" quantity : "+products[index].Quantity;
											divNameDesc.appendChild(quantity);
											
											insertBlankLine(quantity);
											divProduct.appendChild(divNameDesc);
											insertBlankLine(divNameDesc);
										}
								  );
	
	aEdit.addEventListener("click",function(event)
								   {
									   
									   editControlPanel(aProductName,event);
								   }
						  );
    
divListProducts.appendChild(divProduct);	
    insertBlankLine(divProduct);
	insertBlankLine(divProduct);

	unHideAddNewProductLink();
}		

function getProductIndex(id) 
{
	console.log(id);
	var pos;
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == id)
		{			
			pos=i;
			console.log(pos);
			return i;
		}
    }
} 		

function removeFromProductsArray(selectedProductIndex)
{
	products.splice(selectedProductIndex,1);
	storeValue();
	console.log(products);
}				  
function storeValue()
{
	var product=JSON.stringify(products);
	localStorage.setItem("data",product);
}

function retrieveValue()
{
	var pro=localStorage.getItem("data");
	if(pro)
	{
		products=JSON.parse(pro);
		var n=products.length;
		//productId=n;
		var i=0;
		while(i<n)
		{
			addProducttoDOM(products[i]);
			i++;
		}
	}
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}
function hideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:hidden");
}

function unHideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:visible");
}

function editControlPanel(aProductName,event)
{
  unHideAddNewProductLink();
  divListProducts.setAttribute("style","visibility:hidden");
		var targetParent=event.target.parentNode;
		var index=getProductIndex(parseInt(targetParent.id));
		
		hideAddNewProductLink();
		
		var lblAddProduct=document.createElement("label");
		lblAddProduct.innerHTML="Add New Product";
		lblAddProduct.setAttribute("style","font-weight:bold");
		divAddProduct.appendChild(lblAddProduct);
		
		insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
	    
		var txtProductName=document.createElement("input");
		txtProductName.setAttribute("type","text");
	    txtProductName.setAttribute("id","txtProductName");
		txtProductName.setAttribute("placeholder", "Enter the product name");	
		txtProductName.setAttribute("style","width:250px");
		txtProductName.value=products[index].Name;
		divAddProduct.appendChild(txtProductName);	
	
		insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
		
		var txtProductDesc=document.createElement("textarea");
		txtProductDesc.setAttribute("id","txtProductDesc");
		txtProductDesc.setAttribute("placeholder", "Enter the product description");	
		txtProductDesc.setAttribute("style","width:250px ; height:50px");
		txtProductDesc.value=products[index].Desc;
		divAddProduct.appendChild(txtProductDesc);
	
		insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
		
		var txtProductPrice=document.createElement("input");
		txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	txtProductPrice.value=products[index].Price;
	divAddProduct.appendChild(txtProductPrice);
	
			insertBlankLine(divAddProduct);
	    insertBlankLine(divAddProduct);
		
		var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.value=products[index].Quantity;
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	var btnSave=document.createElement("button");
	btnSave.setAttribute("id","btnSave");
	btnSave.innerHTML="Save Changes";
	divAddProduct.appendChild(btnSave);

	btnSave.addEventListener("click",function(event)
										{
											var targetParent=event.target.parentNode;
											var node= document.getElementById(targetParent.id);
											//var change_name=document.getElementById(index+products[index].Name);
											//change_name.innerHTML=txtProductName.value;
											aProductName.innerHTML=txtProductName.value;
											divListProducts.setAttribute("style","visibility:visible");
											editProductsArray(index);
										}
								 );
		
}

function editProductsArray(index)
{
	products[index].Name=document.getElementById("txtProductName").value;
	console.log(products[index].Name);
		products[index].Desc=document.getElementById("txtProductDesc").value;
		console.log(products[index].Desc);
		products[index].Price = document.getElementById("txtProductPrice").value;
	    console.log(products[index].Price);
		products[index].Quantity = document.getElementById("txtProductQuantity").value;
		console.log(products[index].Quantity); 
		storeValue();
		deleteNewProductPanel();
		unHideAddNewProductLink();
		//var change_name=document.getElementById(index+1+products[index].Name);
		//change_name.innerHTML=products[index].Name;
		
}