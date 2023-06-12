import FolderImage from "./img/FolderImg"

function Copyright() {
    return (
        <>
            <div style={{color: 'white', backgroundColor: '#FFAF00', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '54px',width:'100%', margin:'auto', position:'absolute', bottom:'0px', left:'0px'}}>Copyright @ 2020 Dewe Tour - Your Name - NIS.All Right reserved</div>
            <div style={{position:'absolute', right:'0px', bottom:'0px',zIndex:'1'}}><img src={FolderImage.LeafLanding} alt="LeafLanding" /></div>
        </>
    )
}

export default Copyright