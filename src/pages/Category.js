import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom';
import FilterCheckbox from '../components/FilterCheckbox';
import Products from '../components/Products';
import categories from '../db/categories.json'
import fakeProducts from '../db/products.json'
import { useFilters } from '../lib/useFilters';

function getComputedProducts(products,filters){
let result=[...products];

if(filters.delivery){
  result=result.filter(p=>p.delivery===true);
}
if(filters.inStock){
  result=result.filter(p=>p.inStock===true);
}
if(filters.expensive){
  result=result.filter(p=>p.price>100);
}
return result;
}

const Category = () => {
  const {id}=useParams();

  const category=categories.find(c=>c.id===id);
  const categoryName=category.name;

  const [products]=useState(fakeProducts.filter(p=>p.categoryId===id));

  const [filter,dispatchFilter]=useFilters({
    delivery:false,
    inStock:false,
    expensive:false,
  })
   const filteredProducts=getComputedProducts(products,filter)

   const OnCheckboxChange=useCallback(ev=>{
     const checkbox=ev.target;

     dispatchFilter({
       type:'SET',
       filterName:checkbox.name,
       value:checkbox.checked,
     })
   },[dispatchFilter]);

  return (
    <div>
      <div>
        <h3>Filters</h3>
      <FilterCheckbox
      id="delivery"
      name="delivery"
      checked={filter.delivery}
      onChange={OnCheckboxChange}
      label="Delivery"
      />
      <FilterCheckbox
      id="inStock"
      name="inStock"
      checked={filter.inStock}
      onChange={OnCheckboxChange}
      label="In stock only"
      />
      <FilterCheckbox
      id="expensive"
      name="expensive"
      checked={filter.expensive}
      onChange={OnCheckboxChange}
      label="Expensive (100+USD)"
      />
    </div>
    <div>
      <h3>{categoryName}</h3>
      <div>
        <Products products={filteredProducts} />
      </div>
    </div>
    </div>
  )
}

export default Category
