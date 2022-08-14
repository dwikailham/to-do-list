import React from 'react'

export default function Button({ onClick, set }) {
    return (
        <div className='button-tambah'>
            <button onClick={() => onClick()}>+ Tambah</button>
        </div>
    )
}
