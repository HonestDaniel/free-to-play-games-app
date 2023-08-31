import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.scss'
import Game from "../Game";

export default function Games (props: any) {

    const { games } = props
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const itemsPerPage = 20;

    useEffect(() => {
        console.log(props)
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(games.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(games.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, games])

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % games.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className='game-field'>
                {currentItems.map((game: any) => {
                    return (
                        <Game {...game}/>
                    )
                })}
            </div>
            <ReactPaginate
                className = 'root'
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                activeLinkClassName='selected'
                pageLinkClassName='page-num'
                nextLinkClassName='next'
                previousLinkClassName='previous'
            />
        </>
    )
}