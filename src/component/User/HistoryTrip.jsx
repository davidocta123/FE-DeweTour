import FolderImage from "../img/FolderImg"
import jwtDecode from 'jwt-decode';
import {useQuery} from 'react-query';
import { API } from '../../config/api';

function HistoryTrip () {
    const idToken = localStorage.getItem("token");
    const idUserByToken = jwtDecode(idToken)
    const {data: dataTransactionUser}= useQuery("dataTransactionUserCache", async () => {
        const response = await API.get(`/transactions/${idUserByToken.id}`)
        return response.data.data
    }) 

    const length = dataTransactionUser?.length
    console.log("datanya", dataTransactionUser)
    return (
        <>
          {length === 0 ? (
            <div style={{ textAlign: 'center', margin: '50px auto', fontSize: '30px', color: "green" }}>
              "Belum pernah melakukan transaksi perjalanan"
            </div>
          ) : (
            <>
              {dataTransactionUser?.map((item, index) => {
                return (
                  <div key={index} style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', width: '1440px', height: 'auto', padding: '0px 202px 60px', backgroundColor: '#E5E5E5', marginBottom:'80px' }}>
                      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'auto auto', width: '1035px', height: '419px', padding: '8px 63px 17px 35px', border: '1px solid #B7B7B7', borderRadius: '10px', position: 'relative', backgroundColor: 'white' }}>
      
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
                          <div style={{ gridColumn: 'span 2' }}><img src={FolderImage.Icon} alt="icon" style={{ height: '68px' }} /></div>
                          <div>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0px', maxWidth: '370px' }}>{item?.day} D/ {item?.night} N {item?.title}</p>
                            {/* <p style={{ fontSize: '14px', margin: '4px 0px 31px' }}>{item?.country}</p> */}

                            {item?.status === "Waiting Payment" ? (
                                <p style={{ width: '112px', height: '24px', fontSize: '12px', backgroundColor: 'rgba(236, 122, 122, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#FF9900' }}>{item?.status}</p>
                                ) : (
                                <p style={{ width: '112px', height: '24px', fontSize: '12px', color: '#EC7A7A', backgroundColor: 'rgba(236, 122, 122, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item?.status}</p>
                                )}

                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridRow: 'span 2' }}>
                            <div>
                              <p style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '18px' }}>Date Trip</p>
                              <p>{item?.dateTrip}</p>
                            </div>
                            <div>
                              <p style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '18px' }}>Duration</p>
                              <p>{item?.day} day {item?.night} night</p>
                            </div>
                            <div>
                              <p style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '18px' }}>Accommodation</p>
                              <p>Hotel {item?.night} Night</p>
                            </div>
                            <div>
                              <p style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '18px' }}>Transportation</p>
                              <p>{item?.transportation}</p>
                            </div>
                          </div>
                        </div>
      
                        <div rowSpan="2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <p style={{ fontWeight: 'bold', fontSize: '36px', marginBottom: '4px' }}>Booking</p>
                          <p style={{ margin: '0px' }}>{item?.date}</p>
                        </div>
      
                        <div className="PaymentTabel" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontSize: '18px', fontWeight: 'bold' }}>
                          <div>No</div>
                          <div>Full Name</div>
                          <div>Gender</div>
                          <div>Phone</div>
                          <div></div>
                          <div></div>
                        </div>
      
                        <div className="PaymentTabel2" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', color: '#B1B1B1' }}>
                          <div>1</div>
                          <div>{item?.customerName}</div>
                          <div>{item?.customerGender}</div>
                          <div>{item?.customerPhone}</div>
                          <div style={{ color: 'black', fontWeight: 'bold' }}>Qty</div>
                          <div style={{ color: 'black', fontWeight: 'bold' }}>: {item?.amount}</div>
                        </div>
      
                        <div className="PaymentTabel3" style={{ display: 'grid', gridTemplateColumns: '10% 18% 18% 18% 18% 18%', gridColumn: 'span 2', fontWeight: 'bold' }}>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div>Total</div>
                          <div style={{ color: 'red', border: '0px' }}>: IDR.{item?.total?.toLocaleString()}</div>
                        </div>
      
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      );
      
}

export default HistoryTrip
