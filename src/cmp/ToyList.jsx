import { ToyPreView } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, username }){
    return(
        <section className="toy-list">
            <ul>
                { 
                    toys.map(toy => <li key={toy.id}>
                        <ToyPreView toy={toy}/>
                        {
                            (username === 'admin') 
                                ? <button onClick={()=>
                                    onRemoveToy(toy.id)}>X</button> 
                                : ''
                        }
                        
                    </li>
                )
                }
            </ul>          
        </section>
    )
}