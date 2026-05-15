import React, { createContext, useState } from 'react';


// 1. Context'i oluşturuyoruz (Merkezi Depo'nun kendisi)
export const PostContext = createContext();

// 2. Provider Bileşeni (Uygulamayı sarmalayacak ve veriyi dağıtacak olan görevli)
export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        {
            id: '1',
            authorName: 'Kullanıcı 16',
            authorUsername: '@user162327',
            authorAvatar: 'U16',
            postText: 'F-35 Programından Çıkarılmadan Kendi Savaş Uçağını Üretmeye Türkiye’nin KAAN Programı Hızla İlerliyor 🇹🇷\n\nTürkiye, 2028 ile 2030 yılları arasında hava kuvvetlerine 20 adet Block-10 KAAN 5. nesil savaş uçağı teslim edecek; bu, Ankara’nın yerli bir hayalet muharip uçak üretme yeteneğine sahip az sayıdaki ülkeden biri olma yolundaki hamlesini hızlandırıyor.',
            tags: ['#history', '#türkiye', '#success', '#stealth fighter'],
            likes: '1.3M',
            comments: [
                {
                    id: 'c1',
                    author: 'Batın Yılmaz',
                    text: 'Bu çalışma gerçekten gurur verici 🇹🇷',
                    avatarInitial: 'B'
                }
            ]
        }
    ]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );

};