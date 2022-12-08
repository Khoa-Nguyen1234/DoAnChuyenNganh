import {React, useState, useRef, useEffect} from 'react';
import TopBar from './TopBar';
import ImageUpload from './ImageUpload';
import Select from 'react-select';
import uploadImage from '../../../services/user.service';
import {addProduct, getInputProduct} from '../../../actions/admin';
import axios from 'axios';
import pathApi from '../../../configs/apiPath';
import {useDispatch, useSelector} from 'react-redux';
import Form from "react-validation/build/form";
import CreatableSelect from 'react-select/creatable';
import {Link} from 'react-router-dom';



function EditProduct() {
    const form = useRef(null);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [gender , setGender] = useState([]);
    const [bodyPart, setPart] = useState([]);
    const [category, setCate] = useState([]);
    const getOut = useRef(null);


    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(form.current);
        await dispatch(addProduct(data));
        getOut.current.click();
    }
   
    useEffect(async () => {
        const temp = await dispatch(getInputProduct());
        console.log(temp);
        setSize(temp.size.map(size => ({value: size._id, label: size.size})));
        setColor(temp.color.map(color => ({value: color._id, label: color.color})));
        setGender(temp.gender.map(gender => ({value: gender._id, label: gender.name})));
        setPart(temp.part.map(part => ({value: part._id, label: part.name})));
        setCate(temp.category.map(category => ({value: category._id, label: category.name})));
    },[]);


    return (
        <form ref={form} onSubmit={handleSubmit} id="add-product-form">
        <div className="Edit-Product">
            <TopBar name="Add product" subName="Products / Add product"/>
            <div >
                <div className="edit-title-input photos">
                <label>Photos</label>
                <ImageUpload/>
                <ImageUpload/>
                <ImageUpload/>
                <ImageUpload/>
                </div>
                <div className="edit-title-input">
                    <label>Name</label>
                    <input className="edit-product-input" type="text" name="name"/>
                </div>
                <div className="edit-title-input">
                    <label>Categories-Gender</label>
                    <Select className="edit-product-input" options={gender}  classNamePrefix="select" name="gender"/>
                </div>
                <div className="edit-title-input">
                    <label>Categories-Part</label>
                    <Select className="edit-product-input" options={bodyPart} classNamePrefix="select" name="part"/>
                </div>
                <div className="edit-title-input">
                    <label>Categories</label>
                    <CreatableSelect className="edit-product-input" options={category} classNamePrefix="select" name="category"/>
                </div>
                <div className="edit-title-input">
                    <label>Brand</label>
                    <input className="edit-product-input" type="text" name="brand"/>
                </div>
                <div className="edit-title-input">
                    <label>Price</label>
                    <input className="edit-product-input" type="number" name="price"/>
                </div>
                <div className="edit-title-input">
                    <label>Size</label>
                    <Select className="edit-product-input" options={size} isMulti classNamePrefix="select" name="size"/>
                </div>
                <div className="edit-title-input">
                    <label>Color</label>
                    <Select className="edit-product-input" options={color} isMulti classNamePrefix="select" name="color"/>
                </div>
                <div className="edit-title-input">
                    <label>Quantity</label>
                    <input className="edit-product-input" type="number" name="quantity"/>
                </div>
                <div className="edit-title-input ">
                    <label>Description</label>
                    <textarea className="edit-product-input input-description" name="description" type="text" form="add-product-form"/>
                </div>
                <div className="edit-title-input save-cancel">
                    <Link to='/admin/product'><button className="edit-cancel-btn" ref={getOut}>Cancel</button></Link>
                    <button className="edit-save-btn" type="submit">Complete</button>
                </div>
            </div>
        </div>
        </form>
    )
}

export default EditProduct
