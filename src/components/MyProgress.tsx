import React, { useEffect, useState } from 'react'
import { Container, Spinner, Table } from 'react-bootstrap'
import { BsFillCaretDownFill, BsFillCaretRightFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import useService from '../hooks/useService'
import { RootState } from '../redux/store'
import { keys } from './../data/keys'
import TooltipHelper from './TooltipHelper'

const MyProgress = () => {

    const majorKeys = Object.keys(keys.major)
    const minorKeys = Object.keys(keys.minor)

    const token = useSelector((state: RootState) => state.credentials.token)

    const [ results, setResults ] = useState<any>()

    const { getAllResults } = useService()

    useEffect(() => {
        getAllResults(token).then(response => {
            setResults(response)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    if (!results) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h2>My progress</h2>
            <Table striped bordered hover className='w-100'>
                <thead>
                    <tr>
                        {[...Array(13).keys()].map(position => 
                            position ? <th key={position} className={'w-7 progress-table-position-header'} rowSpan={2} >{position}</th> :
                            <th key={'position'} className='w-10'>Position <BsFillCaretRightFill/></th>
                        )}
                    </tr>
                    <tr>
                        <th>Key <BsFillCaretDownFill /></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(majorKeys.length).keys()].map(rowIndex => {
                        return (
                            <tr key={rowIndex}>
                                <th className='result-table-key'>
                                    <p className='result-table-key-major'>
                                        {majorKeys[rowIndex]} Major
                                    </p>
                                    <span className='result-table-key-minor'>
                                        ({minorKeys[rowIndex]} Minor)
                                    </span>
                                </th>
                                {
                                    [...Array(12).keys()].map(colIndex => (
                                        <ResultTableCell key={`result-${rowIndex}-${colIndex}`}
                                            major={results['major'][majorKeys[rowIndex]][colIndex + 1]} 
                                            minor={results['minor'][minorKeys[rowIndex]][colIndex + 1]}
                                        />
                                    ))
                                    
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

interface IResultTableCellProps {
    major: {
        time: number,
        date: Date
    } | string,
    minor: {
        time: number,
        date: Date
    } | string
}

const ResultTableCell: React.FC<IResultTableCellProps> = ({ major, minor }) => {

    const formatTime = (time: number) => {
        const mins = Math.floor((time / 1000) / 60)
        const minsString = mins ? `${mins} min${mins > 1 ? "s" : ""}` : ""
        const secondsString = `${Math.floor(((time / 1000) % 60) * 100) / 100} s`
        return  `${minsString} ${secondsString}`
    }

    if (major === "-" && minor === "-") {
        return <TooltipHelper content="No saved results... yet" children={<td className={"result-table-cell"}>-</td>} />
    } else if (minor === "-") {
        // @ts-ignore
        return <TooltipHelper content={new Date(major.date).toLocaleDateString()} children={<td className={"result-table-cell"}>{formatTime(major.time)}</td>} />
    } else if (major === "-") {
        // @ts-ignore
        return <TooltipHelper content={new Date(minor.date).toLocaleDateString()} children={<td className={"result-table-cell"}>{formatTime(minor.time)}</td>} />
    } else {
        const majorAsObject = major as {time: number, date: Date}
        const minorAsObject = minor as {time: number, date: Date}
        if (majorAsObject.time < minorAsObject.time) {
            return <TooltipHelper content={new Date(majorAsObject.date).toLocaleDateString()} children={<td className={"result-table-cell"}>{formatTime(majorAsObject.time)}</td>} />
        } else {
            return <TooltipHelper content={new Date(minorAsObject.date).toLocaleDateString()} children={<td className={"result-table-cell"}>{formatTime(minorAsObject.time)}</td>} />
        }
    }
}

export default MyProgress