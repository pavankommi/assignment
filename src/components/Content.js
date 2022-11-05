import React, { useEffect, useState } from 'react'
import '../styles/Content.css'
import 'antd/dist/antd.css';
import { Input, Select, Pagination } from 'antd';

export default function Content() {

    const [data, setData] = useState({})
    const [pageNum, setPageNum] = useState(0)

    //Search
    const [stories, setStories] = useState('')
    const [searchBy, setSearchBy] = useState('search')
    const [timePeriod, setTimePeriod] = useState(0)
    const [url, setUrl] = useState('http://hn.algolia.com/api/v1')

    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        console.log(url.concat("", `/${searchBy}?`).concat("", `&tags=${stories}`).concat("", `&query=${searchString}`).concat("", `&page=${pageNum}`).concat("", `&numericFilters=created_at_i>${timePeriod}`))
        fetch(url.concat("", `/${searchBy}?`).concat("", `&tags=${stories}`).concat("", `&query=${searchString}`).concat("", `&page=${pageNum}`).concat("", `&numericFilters=created_at_i>${timePeriod}`))
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
    }, [url, pageNum, searchBy, stories, searchString, timePeriod])

    console.log(searchString)

    const onSearch = (val) => {
        setPageNum(0)
        setSearchString(val)
    }

    const handlePage = (page, pageSize) => {
        setPageNum(page - 1)
        setTimeout(function () {
            window.scrollTo(0, 0)
        }, 700);
    }

    const handleStories = (value) => {
        setPageNum(0)
        if (value == 'all') {
            setStories('')
        } else if (value == 'comment') {
            setStories('comment')
        } else {
            setStories('story')
        }
    }

    const handleDate = (value) => {
        setPageNum(0)
        if (value == 'Date') {
            setSearchBy('search_by_date')
        } else {
            setSearchBy('search')
        }
    }

    const handleTime = (value) => {
        var ts = Math.round(new Date().getTime() / 1000);
        var tsYesterday = ts - (24 * 3600);
        var tsOneWeek = ts - (24 * 3600 * 7)
        var tsOneMonth = ts - (24 * 3600 * 30)
        var tsOneYear = ts - (24 * 3600 * 365)
        if (value == 'Last 24h') {
            setTimePeriod(tsYesterday)
        } else if (value == 'Past Week') {
            setTimePeriod(tsOneWeek)
        } else if (value == 'Past Month') {
            setTimePeriod(tsOneMonth)
        } else if (value == 'Past Year') {
            setTimePeriod(tsOneYear)
        } else {
            setTimePeriod(0)
        }
        console.log(ts)
    }

    console.log(data)

    return (
        <div className='container'>
            <div>
                <SearchBar onSearch={onSearch} />
                <SearchFilter handleStories={handleStories} handleDate={handleDate} handleTime={handleTime} />
            </div>
            {
                data === {} ?
                    <div>Loading...</div> :
                    <div>
                        {
                            data.hits ?
                                data.hits.map(e =>
                                    <div className='itemContainer'>
                                        <div >
                                            {e.comment_text ? <div className='itemTitle'>
                                                <div >
                                                    {e.comment_text ? e.comment_text : <div>No title</div>}
                                                </div>
                                            </div> : <div></div>}
                                            {e.title ? <div className='itemTitle'>
                                                <div className='titleAndDividerStyle'>
                                                    <div >
                                                        {e.title ? e.title : <div>No title</div>}
                                                    </div>
                                                    <div className='divider'>
                                                        |
                                                    </div>
                                                </div>
                                                <div className='urlStyle' onClick={() => window.open(e.url, '_blank').focus()}>
                                                    ({e.url})
                                                </div>
                                            </div> : <div></div>}
                                        </div>
                                        <div className='subsStyle'>{e.points} points | {e.author} | {new Date(e.created_at).toString().substring(4, 15)} | {e.num_comments ? e.num_comments : 0} comments</div>
                                    </div>
                                ) :
                                <div>Loading...</div>
                        }
                    </div>
            }
            <div className='paginationStyle'>
                <Pages handlePage={handlePage} pageNum={pageNum} />
            </div>
        </div>
    )
}

export const SearchBar = ({ onSearch }) => {

    const { Search } = Input;

    return (
        <div>
            <Search
                placeholder="Search stories by title, url or author"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={(val) => onSearch(val)}
            />
        </div>
    )
}

export const SearchFilter = ({ handleStories, handleDate, handleTime }) => {

    return (
        <div className='filterStyle'>
            <Select
                defaultValue="Stories"
                style={{ width: 120 }}
                onChange={(value) => handleStories(value)}
                size={'small'}
                options={[
                    {
                        value: 'all',
                        label: 'All',
                    },
                    {
                        value: 'story',
                        label: 'Stories',
                    },
                    {
                        value: 'comment',
                        label: 'Comments',
                    }
                ]}
            />
            <Select
                defaultValue="Popularity"
                style={{ width: 120, marginLeft: 3 }}
                onChange={(value) => handleDate(value)}
                size={'small'}
                options={[
                    {
                        value: 'Popularity',
                        label: 'Popularity',
                    },
                    {
                        value: 'Date',
                        label: 'Date',
                    }
                ]}
            />
            <Select
                defaultValue="All time"
                style={{ width: 120, marginLeft: 3 }}
                onChange={(value) => handleTime(value)}
                size={'small'}
                options={[
                    {
                        value: 'All time',
                        label: 'All time',
                    },
                    {
                        value: 'Last 24h',
                        label: 'Last 24h',
                    },
                    {
                        value: 'Past Week',
                        label: 'Past Week',
                    },
                    {
                        value: 'Past Month',
                        label: 'Past Month',
                    },
                    {
                        value: 'Past Year',
                        label: 'Past Year',
                    }
                ]}
            />
        </div>
    )
}

export const Pages = ({ handlePage, pageNum }) => {
    return (
        <div>
            <Pagination
                total={500}
                current={pageNum + 1}
                size={'small'}
                onChange={(page, pageSize) => handlePage(page, pageSize)}
            />
        </div>
    )
}
