import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";

import React from "react";

function Home() {
  // <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}></motion.div>
  return (
    <div>
      <Veggie />
      <Popular />
    </div>
  );
}

export default Home;
