import { ToyPreView } from "./ToyPreview.jsx"

export function ToyList({ toys }){
    return(
        <section className="toy-list">
            <ul>
                { 
                    toys.map(toy => <li key={toy.id}>
                        <ToyPreView toy={toy}/>
                    </li>
                )
                }
            </ul>          
        </section>
    )
}