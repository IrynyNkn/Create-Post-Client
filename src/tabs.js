import {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './tabs.module.css';

function ControlledTabs() {
    const [key, setKey] = useState('home');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="home" title="Home">
                <div>
                    The terms modernism and modern art are generally used to describe the succession of art movements that critics and historians have identified since the realism of Gustav Courbet and culminating in abstract art and its developments in the 1960s.

                    Although many different styles are encompassed by the term, there are certain underlying principles that define modernist art: A rejection of history and conservative values (such as realistic depiction of subjects); innovation and experimentation with form (the shapes, colours and lines that make up the work) with a tendency to abstraction; and an emphasis on materials, techniques and processes. Modernism has also been driven by various social and political agendas. These were often utopian, and modernism was in general associated with ideal visions of human life and society and a belief in progress.

                    By the 1960s modernism had become a dominant idea of art, and a particularly narrow theory of modernist painting had been formulated by the highly influential American critic Clement Greenberg. A reaction then took place which was quickly identified as postmodernism.
                </div>
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <div className={styles.tabContent}>I'm profiler :)</div>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                <div>I'm contact :)</div>
            </Tab>
        </Tabs>
    );
}

export default ControlledTabs;
