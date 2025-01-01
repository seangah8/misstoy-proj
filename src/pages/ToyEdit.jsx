import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { uploadService } from '../services/upload.service.js'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'


export function ToyEdit(){

    const navigate = useNavigate()
    const params = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptytoy())
    const [uploadingImg, setUploadingImg] = useState(false)
    
    useEffect(()=>{
        if(params.toyId){
            console.log('sdo;fn;sjeznvds')
            loadToy()
        } 
    },[])

    async function loadToy(){
        const toy = await toyService.get(params.toyId)
        setToyToEdit(toy)
    }

    function onBack() {
        params.toyId ? navigate(`/toys/${params.toyId}`)
        : navigate(`/toys`)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        if (field === 'labels') { 
            let toyLabels = [...toyToEdit.labels]
            if (value && !isToyOwnLable(target.id)) {
                toyLabels.push(target.id)
            } else if (!value && isToyOwnLable(target.id)) {
                toyLabels = toyLabels.filter(lab => lab !== target.id)
            }
            value = toyLabels
        }
        

        setToyToEdit(prevToy => 
            ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy(event){
        event.preventDefault() 
        await saveToy(params.toyId, toyToEdit)
        onBack()
    }

    function isToyOwnLable(lable){
        return toyToEdit.labels.some(lab => lab === lable)
    }

    async function uploadImg(event){
        setUploadingImg(true)
        event.preventDefault()
        const {secure_url} = await uploadService.uploadImg(event)
        setToyToEdit(prevToy => 
            ({ ...prevToy, imageLink: secure_url }))
        setUploadingImg(false)
    }

    if(!toyToEdit) return <h2>Loading...</h2>

    const { imageLink, inStock, name, price } = toyToEdit

    return(
        <section className="toy-edit">
            <button onClick={onBack}>Back</button>
            <form onSubmit={onSaveToy}>

                <label htmlFor="name">Toy:</label>
                <input 
                    onChange={handleChange} 
                    value={name} 
                    type="text" 
                    name="name" 
                    id="name" />

                <label htmlFor="labels">Labels:</label>

                {
                    
                    toyService.getLabels().map(label=>
                        <div key={label}>
                            <label htmlFor={`${label}`}>{label}</label>
                            <input 
                                onChange={handleChange} 
                                type='checkbox' 
                                name="labels"
                                checked={isToyOwnLable(label)} 
                                id={`${label}`} />
                        </div>
                    )
                }

                <label htmlFor="price">Price:</label>
                <input 
                    onChange={handleChange} 
                    value={price} 
                    type="number" 
                    name="price" 
                    id="price" />

                <label htmlFor="in-stock">in stock:</label>
                <input 
                    onChange={handleChange} 
                    checked={inStock} 
                    type="checkbox" 
                    name="inStock" 
                    id="in-stock" />


                {uploadingImg ? <p>Uploading...</p>: <img src={imageLink} />}
                <label htmlFor="imgUpload">Upload: </label>
                <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />


                <button>{params.toyId? 'Submit Canges' : 'Add Toy'}</button>
                
            </form>
        </section>
    )
}