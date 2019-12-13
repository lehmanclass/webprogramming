import React from 'react';
import '../css/CardContainer.css';
import anxiety from '../images/anxiety.png';
import insomnia from '../images/insomnia.png';
import mental_health from '../images/mental_health.png';

export default function CardContainer() {
  return (
    <div className="CardContainer position-relative">
      <div className="container-content">
        <div className="card">
          <div className="card-body">
            <img src={insomnia} alt="insomnia"/>
            <div className="body-question">
              <strong>Feeling depressed?</strong>
            </div>
              <div className="body-text">
                Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, the way you think and how you act.
              </div>
            </div>
          <div className="card-footer">
            HOTLINE: 1-800-662-4357
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <img src={mental_health} alt="mental_health"/>
            <div className="body-question">
              <strong>Feeling suicidal?</strong>
              </div>
              <div className="body-text">
                Suicidal thoughts, or suicidal ideation, means thinking about or planning suicide.Thoughts can range from a detailed plan to a fleeting consideration. It does not include the final act of suicide.
              </div>
          </div>
          <div className="card-footer">
            HOTLINE: 1-800-273-8255
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <img src={anxiety} alt="anxiety"/>
            <div className="body-question">
              <strong>Feeling anxiety?</strong>
            </div>
              <div className="body-text">
                Intense, excessive, and persistent worry and fear about everyday situations. Fast heart rate, rapid breathing, sweating, and feeling tired may occur.
              </div>
            </div>
          <div className="card-footer">
            HOTLINE: 1-800-950-6264
          </div>
        </div>
      </div>
    </div>
  );
}