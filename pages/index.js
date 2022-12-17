import { getSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import LoginPage from "./loginPage";
import _dashboard from "./_dashboard";

const IndexPage = ({ session }) => {
  const signInButtonNode = () => {
    if (session) {
      return false;
    }
    return <div></div>;
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }
    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  };

  if (!session) {
    return (
      <div className="hero">
        <div className="navbar">
          {signOutButtonNode()}
          {signInButtonNode()}
        </div>
        <LoginPage />
      </div>
    );
  }

  return (
    <div className="hero">
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="navbar">
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
      <div className="text">Logged in</div>
      <_dashboard />
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};

export default IndexPage;
