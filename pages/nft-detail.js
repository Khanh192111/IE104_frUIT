import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { shortenAddress } from '../utils/shortenAddress';
import { Context } from '../context/Context';
import assets from '../assets';
import Button from '../components/Button';
import Loading from '../components/Loading';

const NFTdetail = () => {
  const { buyNFT, currentAccount } = useContext(Context);
  const router = useRouter();
  const [nft, setNft] = useState({
    price: '',
    tokenId: '',
    id: '',
    seller: '',
    owner: '',
    image: '',
    name: '',
    description: '',
    tokenURI: '',
  });

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  console.log(nft);
  return (
    <div className="flex justify-center my-8 md:flex-col">
      <div className="relative flex justify-center flex-1 p-12 border-r sm:px-4 md:border-r-0 md:border-b dark:border-prim-black-1 border-prim-gray-1">
        <div className="relative shadow-xl minmd:mx-28 minmd:w-700 minmd:h-700 w-500 sm:w-full sm:h-300 h-500 rounded-3xl">
          <Image
            src={nft.image}
            alt=""
            objectFit="cover"
            className="rounded-3xl"
            layout="fill"
          />
        </div>
      </div>

      <div className="justify-start flex-1 p-12 sm:px-4 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="text-2xl font-semibold font-poppins minmd:text-3xl">
            {nft.name}
          </h2>
        </div>

        <div className="mt-10">
          <p className="text-base font-medium font-poppins dark:text-white text-prim-black-1 minlg:text-base">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3 hover:cursor-pointer">
            <div className="relative w-12 h-12 mr-2 minlg:w-20 minlg:h-20 ">
              <Image
                src={assets.creatornft}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="text-sm font-semibold font-poppins minmd:text-lg">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-10">
          <div className="flex flex-row w-full border-b dark:border-prim-black-1 border-prim-gray-1">
            <p className="mb-2 text-base font-medium font-poppins">Details</p>
          </div>
          <div className="mt-3">
            <p className="text-base font-normal font-poppins">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row mt-20 sm:flex-col">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="p-2 text-base font-normal border text-prim-gray-2 font-poppins border-prim-gray-2">
              You can't buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName="List on Marketplace"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => {}}
            />
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ETH`}
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTdetail;
