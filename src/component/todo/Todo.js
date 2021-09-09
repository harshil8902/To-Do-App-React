import './todo.css';
import { useState, useEffect } from 'react';

//get local storage data
function getLocalData(){
    const list=localStorage.getItem('todoList')
    if(list){
        return JSON.parse(list)
    }
    else{
        return([])
    }
}
function Todo() {
    const [inputdata, setinputdata] = useState("");
    const [items, setitems] = useState(getLocalData())
    const [editeditems,setediteditems] = useState("")
    const [toggle,settoggle] = useState(false)
    //add Items
    function additems() {
        if (!inputdata) {
            alert("Please enter input data")
        }
        else if(inputdata&&toggle) {
            setitems(
                items.map((currele)=>{
                    if(currele.id===editeditems){
                        return {...currele,name:inputdata}
                    }
                    return currele
                    
                })
            )
            settoggle(false);
            editeditems(null);
            setinputdata("")
        }
        else {
            const newitems = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setitems([...items, newitems])
            setinputdata("")
        }
    }
    //delete items
    function deleteitems(id) {
        const updateitems = items.filter((currele) => {
            return currele.id !== id;
        });
        setitems(updateitems);

    }
    //remove All items
    function removeAll() {
        setitems([]);

    }
    //edit items
    function editItems(id){
        const edititems=items.find((currele)=>{
            return currele.id === id;
        })
        setinputdata(edititems.name)
        setediteditems(id);
        settoggle(true)

    }
    //Local storage
    useEffect(()=>{
        localStorage.setItem("todoList",JSON.stringify(items));

    },[items])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="icon"></img>
                        <figcaption>Add your list here👇</figcaption>
                    </figure>
                    <div className="addItems">

                        <input type="text" placeholder="✍Add Items" value={inputdata} onChange={(e) => setinputdata(e.target.value)} className="form-control" />
                        {toggle?<i className="far fa-edit add-btn" onClick={additems}></i>:
                        <i className="fa fa-plus add-btn" onClick={additems}></i>
                        }
                    </div>
                    {/*showItems */}
                    <div className="showItems">
                        {
                            items.map((curritem, index) => {
                                return (
                                    <div className="eachItem" key={index}>
                                        <h3>{curritem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn"onClick={()=>editItems(curritem.id)}></i>
                                            <i className="fas fa-trash-alt add-btn" onClick={() => deleteitems(curritem.id)}></i>

                                        </div>

                                    </div>

                                )

                            })
                        }

                    </div>


                    {/* RemoveItems */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CheckList</span></button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Todo;