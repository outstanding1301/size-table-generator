import React, { useState } from 'react';
import './SizeCalculator.css';


function SizeCalculator() {
    const [sizes, setSizes] = useState([])
    const [types, setTypes] = useState([])

    const [temp, setTemp] = useState(0)

    const [defSize, setDefSize] = useState({})
    const [delSize, setDelSize] = useState({})

    const onAddSize = () => {
        if (temp != -1) {
            if(temp.includes('~')) {
                const [from, to] = temp.split('~');
                for(let i=parseInt(from);i<=parseInt(to);i+=10) {
                    setSizes(sizes => sizes.concat(i));
                }
            }
            else 
                setSizes(sizes => sizes.concat(parseInt(temp)));
            document.getElementById('inputSize').value = '';
            setTemp(-1);
        }
    }

    const onAddType = () => {
        if (temp != -1) {
            if(temp.includes(',')) {
                const ts = temp.split(',');
                for(const type of ts) {
                    defSize[type] = 0
                    delSize[type] = 0
                }
                setTypes(types => types.concat(ts));
            }
            else {
                defSize[temp] = 0
                delSize[temp] = 0
                setTypes(types => types.concat(temp));
            }
            document.getElementById('inputType').value = '';
            setTemp(-1);
        }
    }

    const onInputSize = (e) => {
        setTemp(e.target.value);
    }

    const onChangeDefSize = (type) => {
        return (e) => {
            setDefSize({
                ...defSize,
                [type]: e.target.value
            })
        }
    }

    const onChangeDelSize = (type) => {
        return (e) => {
            setDelSize({
                ...delSize,
                [type]: e.target.value
            })
        }
    }

    const onEnterSize = (e) => {
        if(e.keyCode == 13)
        {
            onAddSize();
        }
    }

    const onEnterType = (e) => {
        if(e.keyCode == 13)
        {
            onAddType();
        }
    }
    
    return (
        <div className="frame">
            <div className="add">
                    <p className="txt">사이즈 추가 (ex: 90~130)</p>
                    {(() => {
                        return <div className="inlinediv">
                            <input id="inputSize" onChange={onInputSize} onKeyDown={onEnterSize}></input>
                            <button onClick={onAddSize}>추가</button>
                            </div>
                    })()}
                </div>

                <div className="add">
                    <p className="txt">측정 대상 추가 (ex: 길이,소매,어깨)</p>
                    {(() => {
                            return <div className="inlinediv">
                                <input id="inputType" onChange={onInputSize} onKeyDown={onEnterType}></input>
                                <button onClick={onAddType}>추가</button>
                                </div>
                        })()}
                </div>
            <div>
                <table>
                    <tr className="head">
                        <th className="left">사이즈</th>
                        {types.map((v) => {return <th>{v}</th>})}
                    </tr>
                    {sizes.map((row, i) => {return (
                        <tr>
                            <th className="left">{row}</th>
                            {types.map((v) => {return <th>{parseFloat(defSize[v])+(parseFloat(delSize[v])*(i))}</th>})}
                        </tr>
                    )})}
                </table>
                <table>
                    <tr>
                        <th></th>
                        {types.map((v) => {return <th>{v}</th>})}
                    </tr>
                    <tr>
                        <th>기본사이즈</th>
                        {types.map((v) => {return <th className="cell"><input onChange={onChangeDefSize(v)}></input></th>})}
                    </tr>
                    <tr>
                        <th>증가량</th>
                        {types.map((v) => {return <th className="cell"><input onChange={onChangeDelSize(v)}></input></th>})}
                    </tr>
                </table>
            </div>
        </div>
    );
}
export default SizeCalculator;