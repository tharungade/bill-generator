export default function Nav()
{
    return (
        <>  
            <div className="flex justify-between">
                <a href="/"><h1 className="p-3 m-1 align-middle font-sans font-bold text-center uppercase rounded-full text-white bg-gray-900" >MK</h1></a>
                <div>
                    <button className="px-7 py-3 m-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button" onClick={LogIn}>LogIn</button>
                </div>
            </div>
        </>
    )
}

function LogIn()
{
    alert("Login is not implemented");
}