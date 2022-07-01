import React from 'react'
import "./pagination.scss"

const Pagination = (props) => {
    const { currentPage, limit, tasks, handleSetCurrentPage } = props
    const endPage = (tasks.length) / limit
    return (
        <div className='panigation-wrapper'>
            {currentPage !== 1 &&
                <button className='btn' onClick={() => handleSetCurrentPage(currentPage - 1)}>{'<'}</button>
            }
            {currentPage - 1 > 0 && <p className='btn' onClick={() => handleSetCurrentPage(currentPage - 1)}>{currentPage - 1}</p>}
            <p className='btn btn--active'>{currentPage}</p>
            {currentPage <= endPage && <p className='btn' onClick={() => handleSetCurrentPage(currentPage + 1)}>{currentPage + 1}</p>}
            {currentPage <= endPage &&
                <button className='btn' onClick={() => handleSetCurrentPage(currentPage + 1)}>{'>'}</button>
            }
        </div >
    )

}

export default Pagination