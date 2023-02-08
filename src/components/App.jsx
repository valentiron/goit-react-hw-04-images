import { useState, useEffect } from 'react';

import getImages from 'API/getImages';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';


const IMG_PAGE = 12;

export default function App() {
  const [searchQuery, isSearchQuery] = useState('');
  const [page, isPage] = useState(1);
  const [searchResult, isSearchResult] = useState([]);
  const [totalPage, isTotalPage] = useState(null);
  const [largeImageURL, isLargeImageURL] = useState(null);
  const [id, isId] = useState(null);
  const [status, isStatus] = useState('idle');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    isStatus('pending');
    getImages(searchQuery, page)
      .then(res => {
        const { hits, totalHits } = res;
        const totalPage = totalHits / IMG_PAGE;

        isSearchResult(prevState => [...prevState, ...hits]);
        isTotalPage(totalPage);

        if (totalHits > 0) {
          isStatus('resolve');
        } else if (!totalHits) {
          isStatus('reject');
        }
      })
      .catch(error => console.log(error))
      .finally(isStatus('resolve'));
  }, [page, searchQuery]);


  function searchbarSubmit(searchQuery) {
    isSearchQuery(searchQuery);
    isPage(1);
    isSearchResult([]);
    isTotalPage(null);
  };

  function onItemClick(largeImageURL, id) {
    isLargeImageURL(largeImageURL);
    isId(id)
  }

  function onModalWindowClose() {
    isLargeImageURL(null);
    isId(null);
  }

  function loadMore() {
    isPage(prevState => prevState + 1)
  }

  return (
    <div className='app'>
        <Searchbar onSubmit={searchbarSubmit}/>
        {status === 'pending' && <Loader />}
        {searchResult.length > 0 && <ImageGallery imageList={searchResult} onItemClick={onItemClick}/>}
        {searchResult.length > 0 && page !== totalPage && <Button loadMore={loadMore}/>}
        {largeImageURL && <Modal largeImageURL={largeImageURL} id={id} onModalWindowClose={onModalWindowClose}/>}
        {status === 'reject' && <p className="rejectText">No result for the request: "<span>{searchQuery}</span>"</p>}
    </div>
  )
}
