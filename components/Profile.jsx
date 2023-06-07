// import React from 'react';
// import Button from '../Button';
// import styled from "styled-components";
// import { useSession, signOut } from "next-auth/react";

// const Container = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
// `;

// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 40%;
//     height: 100%;
//     padding: 4rem;

//     @media (max-width: 768px) {
//         width: 90%;
//     }
// `;

// const UserName = styled.h3`
//     margin: 1rem;
// `;

// const UserEmail = styled.h5`
//     margin-bottom: 1rem;
//     color: slateblue;
//     font-size: 0.9rem;
// `;

// const UserProfile = () => {
//     const { data: session } = useSession();

//     return (
//         <Container>
//             <Wrapper>
//                 {
//                     session &&
//                     <>
//                         <UserName>
//                             {
//                                 `Hello ${session?.user?.fullName}`
//                             }
//                         </UserName>
//                         <UserEmail>
//                             {session?.user?.email}
//                         </UserEmail>

//                         <Button
//                             title="Logout"
//                             onClick={signOut}
//                         />
//                     </>
//                 }
//             </Wrapper>
//         </Container>
//     );
// };

// export default UserProfile;