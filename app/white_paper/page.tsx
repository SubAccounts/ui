import { title } from "@/components/primitives";

export default function WhitePaperPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className={title({ size: "lg" })}>SubAccounts: White Paper</h1>
      <h2 className={title({ size: "md" })}>Abstract</h2>
      <p>
        SubAccounts is an innovative project aimed at simplifying the staking
        process in the Polkadot network using Ethereum wallets. By leveraging
        secure encryption techniques and a user-friendly interface, SubAccounts
        enables users to create and manage Polkadot staking accounts
        (SubAccounts) while using only their Ethereum credentials. The solution
        ensures that private information remains secure by storing encrypted
        data on the blockchain, making it accessible only to the rightful owner.
        The platform aims to expand its capabilities by offering similar
        functionality across multiple networks and simplifying complex staking
        mechanisms for broader user adoption.
      </p>
      <h2 className={title({ size: "md" })}>Problem Statement</h2>
      <p>
        Staking in the Polkadot ecosystem, particularly using its Nominated
        Proof-of-Stake (NPoS) consensus model, can be intimidating and complex
        for users who lack technical expertise. Additionally, managing multiple
        wallets across different networks adds further friction for users who
        are invested in both Ethereum and Polkadot ecosystems. There is a
        growing need for a seamless solution that combines simplicity, security,
        and cross-chain compatibility, allowing users to stake assets in
        Polkadot using their existing Ethereum credentials.
      </p>
      <h2 className={title({ size: "md" })}>Vision</h2>
      <p>
        SubAccounts aims to bridge the gap between Ethereum and Polkadot
        ecosystems by offering a secure and easy-to-use staking solution. By
        allowing users to create encrypted Polkadot SubAccounts linked to their
        Ethereum wallets, the platform eliminates the need for users to manage
        multiple wallets. Our mission is to demystify the staking process in
        Polkadot and make it accessible to all users, regardless of their
        technical expertise.
      </p>
      <h2 className={title({ size: "md" })}>Key Features</h2>
      <ul className="list-decimal">
        <li>
          <b>Ethereum Wallet Integration:</b> SubAccounts allows users to stake
          in the Polkadot network using only their Ethereum wallet. This
          eliminates the need to set up separate wallets or manage private keys
          specific to Polkadot.
        </li>
        <li>
          <b>SubAccount Encryption and Security:</b> The SubAccount is created
          in the user’s web interface and remains securely within that
          environment until encrypted. The encryption process involves several
          layers:
          <ol className="list-disc ml-4">
            <li>The wallet data is formatted into JSON.</li>
            <li>This JSON is encrypted using a password chosen by the user.</li>
            <li>
              The resulting encrypted string is further encrypted using the AES
              algorithm and second password chosen by the user.
            </li>
            <li>
              Finally, the AES-encrypted string is encrypted with the user’s
              Ethereum public key, ensuring that only the user can decrypt it
              using their Ethereum private key.
            </li>
          </ol>
        </li>
        <li>
          <b>Blockchain Storage:</b> The final encrypted data is stored in a
          smart contract on the blockchain, ensuring immutability and
          transparency. While anyone can access this data, it is effectively
          unreadable without the correct decryption credentials, which include
          two passwords and access to the user’s Ethereum private key.
        </li>
        <li>
          <b>Cross-Network Compatibility:</b> Although the primary focus is on
          Polkadot staking, the encryption methodology is flexible enough to
          support other blockchain networks. Future updates will expand the
          platform’s capability to create and manage SubAccounts for other
          networks, providing a unified staking experience across multiple
          ecosystems.
        </li>
        <li>
          <b>User-Friendly Interface:</b> The platform offers a streamlined
          interface that abstracts away the complexities of Polkadot’s NPoS
          staking mechanism. Through the integration with services like
          ChainFlip, users can deposit assets and withdraw rewards with just a
          few clicks.
        </li>
      </ul>
      <h2 className={title({ size: "md" })}>Technical Architecture</h2>
      <h3 className={title({ size: "sm" })}>Encryption Flow</h3>
      <ul className="list-decimal">
        <li>
          <b>Wallet Creation:</b> The Polkadot wallet is created within the
          user’s web interface.
        </li>
        <li>
          <b>Data Serialization:</b> The wallet data is serialized into JSON
          format.
        </li>
        <li>
          <b>Password Encryption:</b> The JSON data is encrypted using a
          password chosen by the user.
        </li>
        <li>
          <b>AES Encryption:</b> The password-encrypted data is further
          encrypted using the AES algorithm and second password chosen by the
          user.
        </li>
        <li>
          <b>Public Key Encryption:</b> The AES-encrypted string is encrypted
          with the public key derived from the user’s Ethereum account.
        </li>
        <li>
          <b>Storage on Blockchain:</b> The final encrypted string is stored in
          a smart contract on the blockchain, making it accessible yet secure.
        </li>
      </ul>

      <h3 className={title({ size: "sm" })}>Decryption Flow</h3>
      <p>To restore the SubAccount, the user needs:</p>
      <ul className="list-disc">
        <li>The Ethereum private key</li>
        <li>The first password used for JSON encryption</li>
        <li>The second password used for AES encryption</li>
      </ul>
      <p>
        The decryption process is performed entirely on the client side,
        ensuring that sensitive information is never exposed to third parties.
      </p>

      <h2 className={title({ size: "md" })}>Use Cases</h2>
      <ul className="list-decimal">
        <li>
          <b>Seamless Polkadot Staking for Ethereum Users:</b> Ethereum users
          can participate in Polkadot staking without needing to learn the
          intricacies of Polkadot’s wallet management or staking processes.
        </li>
        <li>
          <b>Cross-Chain Staking Management:</b> SubAccounts will eventually
          support staking operations across multiple networks, providing a
          single interface for users to manage all their staking activities.
        </li>
        <li>
          <b>Data Security and Recovery:</b> Users have peace of mind knowing
          that their SubAccount data is encrypted and recoverable using a
          combination of their Ethereum credentials and chosen passwords.
        </li>
      </ul>

      <h2 className={title({ size: "md" })}>Roadmap</h2>
      <ul className="list-decimal">
        <li>
          <b>Adding Bridge Support (ChainFlip) in the Interface:</b> Integrating
          ChainFlip into the interface to facilitate cross-chain swaps and asset
          management, making liquidity management for staking and transfers more
          user-friendly.
        </li>
        <li>
          <b>
            Deploying the Smart Contract in Other EVM Networks (First Target:
          </b>{" "}
          Binance Smart Chain): Expanding the platform to other EVM-compatible
          networks, starting with BSC. This will provide users with more options
          to leverage familiar tools in their preferred networks.
        </li>
        <li>
          <b>
            Integrating with Staking Providers for Easier Validator Selection:
          </b>{" "}
          Implementing integrations with staking providers for automated
          selection and optimization of validators. This will not only improve
          the user experience but also unlock potential monetization
          opportunities for the project through partnerships and fees.
        </li>
        <li>
          <b>
            Adding More Interaction Methods with the Polkadot Blockchain (e.g.,
            Voting):
          </b>{" "}
          Expanding the platform’s functionality to include governance tools,
          allowing users to participate in Polkadot network voting and
          decision-making directly through the platform.
        </li>
        <li>
          <b>
            Cross-Chain Integration with ChainFlip to Deploy Contracts in Any
            Network:
          </b>{" "}
          Enabling the deployment of contract instances across different
          networks with cross-chain transaction support via ChainFlip, allowing
          the platform to scale into a multi-network ecosystem.
        </li>
        <li>
          <b>Developing a Browser Extension for Easier Account Access:</b>{" "}
          Creating a convenient browser extension to streamline access to user
          accounts and staking operations, reducing the reliance on the web
          interface for day-to-day activities.
        </li>
        <li>
          <b>
            Adding Support for Staking in Networks Beyond Polkadot (Solana,
            Cosmos):
          </b>{" "}
          Expanding staking capabilities to include other networks such as
          Solana and Cosmos, making the platform a versatile tool for staking
          across multiple ecosystems.
        </li>
      </ul>
      <h2 className={title({ size: "md" })}>Conclusion</h2>
      <p>
        SubAccounts addresses a critical need for simplified staking solutions
        in the Polkadot network, targeting Ethereum users who seek secure and
        seamless cross-chain experiences. By combining robust encryption
        techniques, decentralized storage, and a user-friendly interface,
        SubAccounts aims to make staking accessible to a broader audience while
        maintaining top-tier security. The platform’s future roadmap includes
        expansion to multiple networks and advanced staking functionalities,
        solidifying SubAccounts as a leading solution in cross-chain staking
        management.
      </p>
    </div>
  );
}
