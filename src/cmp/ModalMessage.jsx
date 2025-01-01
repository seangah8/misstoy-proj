import { eventBusService } from "../services/event.bus.service.js"

import { useState, useEffect } from 'react'

import { removeToy } from '../store/actions/toy.actions.js'



export function ModalMessage() {

    const [modal, setModal] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService
            .on('show-modal', modal => setModal(modal))
        return unsubscribe
    }, [])

    function onCloseModal() {
        setModal(null)
    }

    function onRemoveToy(){
        removeToy(modal.toy.id)
        onCloseModal()
    }

    if (!modal) return null

    else if(modal.type === 'remove-toy') return(
        <section className='modal-remove-toy'>
            <button onClick={onCloseModal} className="close-btn">X</button>
            <h4>{`Are you sure you want to remove: ${modal.toy.name}?`}</h4>
            <button onClick={onRemoveToy}>Remove Toy</button>
        </section>
    )

    else return null
}