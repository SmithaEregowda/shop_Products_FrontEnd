import React from 'react'
import styles from './footer.module.scss'
const Footersection = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.detailSection}>
            <div className={styles.singleSection}>
              <div className={styles.rowHeading}>About</div>
              <div className={styles.dataRow}>
                <div>Contact Us</div>
                <div>About Us</div>
                <div>Careers</div>
                <div>Veggies Stories</div>
                <div>Press</div>
                <div>Veggis Wholesale</div>
                <div>Corporate Information</div>
              </div>
            </div>
            <div className={styles.singleSection}>
              <div className={styles.rowHeading}>About</div>
              <div className={styles.dataRow}>
                <div>Contact Us</div>
                <div>Contact Us</div>
                <div>Contact Us</div>
                <div>Contact Us</div>
              </div>
            </div>

            <div className={styles.singleSection}>
              <div className={styles.rowHeading}>HELP</div>
              <div className={styles.dataRow}>
                <div>Payments</div>
                <div>Shipping</div>
                <div>Cancellation & Returns</div>
                <div>FAQ</div>
              </div>
            </div>
            <div className={styles.singleSection}>
              <div className={styles.rowHeading}>CONSUMER POLICY</div>
              <div className={styles.dataRow}>
                <div>Cancellation & Returns</div>
                <div>Terms Of Use</div>
                <div>Security</div>
                <div>Privacy</div>
                <div>Sitemap</div>
                <div>Grievance Redressal</div>
                <div>EPR Compliance</div>
              </div>
            </div>
            <div className={styles.singleSection}>
              <div className={styles.rowHeading}>SOCIAL</div>
              <div className={styles.dataRow}>
                <div>Facebook</div>
                <div>Twitter</div>
                <div>YouTube</div>
                <div>Instagram</div>
              </div>
            </div>
        </div>
        <div className={styles.linkInfo}>
            <div className={styles.firstBox}>
                <div>Become seller</div>
                <div>Gift Cards</div>
                <div>Help Center</div>
                <div>Advertise</div>
            </div>
            <div>
            © 2007-2023 Veggies.com
            </div>
        </div>
    </div>
  )
}

export default Footersection