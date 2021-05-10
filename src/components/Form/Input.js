// import React, { useEffect, useRef } from 'react';
// import { useField } from '@unform/core';

// export default function Input({ name, ...props }) {
//   const inputRef = useRef(null);
//   const { fieldName, registerField, defaultValue, error } = useField(name);

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: inputRef.current,
//       path: 'value'
//     });
//   }, [fieldName, registerField]);

//   return (
//     <>
//       <input ref={inputRef} {...props}/>
//       { error && <span style={{color: '#F00', textAlign: 'left'}}>{error}</span>}
//     </>
//   )
// }