import React from 'react';
import '../css/About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="column">
                <h1>Grammar for mini-Python</h1>
                <ol className="about-list">
                    <li><strong>Program</strong> := Program MainStatement | MainStatement</li>
                    <li><strong>MainStatement</strong> := DefStatement | AssignStatement</li>
                    <li><strong>Statement</strong> := DefStatement | IfStatement | ReturnStatement | PrintStatement | WhileStatement | AssignStatement | FunctionCallStatement</li>
                    <li><strong>DefStatement</strong> := def identifier ( ArgList ) : Sequence</li>
                    <li><strong>ArgList</strong> := identifier Arglist | ε</li>
                    <li><strong>MoreArgs</strong> := , identifier MoreArgs | ε</li>
                    <li><strong>IfStatement</strong> := if Expression : Sequence else : Sequence</li>
                    <li><strong>WhileStatement</strong> := while Expression : Sequence</li>
                    <li><strong>ForStatement</strong> := for Expression in ExpressionList : Sequence</li>
                    <li><strong>ReturnStatement</strong> := return Expression NEWLINE</li>
                    <li><strong>PrintStatement</strong> := print Expression NEWLINE</li>
                    <li><strong>AssignStatement</strong> := identifier = Expression NEWLINE</li>
                    <li><strong>FunctionCallStatement</strong> := PrimitiveExpression ( ExpressionList ) NEWLINE</li>
                    <li><strong>ExpressionStatement</strong> := ExpressionList NEWLINE</li>
                    <li><strong>Sequence</strong> := INDENT MoreStatements DEDENT</li>
                    <li><strong>MoreStatements</strong> := Statement MoreStatements | Statement</li>
                    <li><strong>Expression</strong> := AdditionExpression Comparison</li>
                    <li><strong>Comparison</strong> := Comparison (&lt;|&gt;|&lt;=|&gt;=|==) AdditionExpression | ε</li>
                    <li><strong>AdditionExpression</strong> := MultiplicationExpression AdditionFactor</li>
                    <li><strong>AdditionFactor</strong> := AdditionFactor (+|-) MultiplicationExpression | ε</li>
                    <li><strong>MultiplicationExpression</strong> := ElementExpression MultiplicationFactor</li>
                    <li><strong>MultiplicationFactor</strong> := MultiplicationFactor (*|/) ElementExpression | ε</li>
                    <li><strong>ElementExpression</strong> := PrimitiveExpression ElementAccess</li>
                    <li><strong>ElementAccess</strong> := ElementAccess [ Expression ] | ε</li>
                    <li><strong>ExpressionList</strong> := Expression MoreExpressions | ε</li>
                    <li><strong>MoreExpressions</strong> := MoreExpressions , Expression | ε</li>
                    <li><strong>PrimitiveExpression</strong> := (-|ε) integer | (-|ε) float | charConst | String | identifier (( ExpressionList ) | ε ) | ( Expression ) | ListExpression | len ( Expression )</li>
                    <li><strong>ListExpression</strong> := [ ExpressionList ]</li>
                </ol>
                <p className="about-note">
                    LA REGLA 14 QUEDA FUERA DE LA GRAMÁTICA PARA EL PARSER, PERO NO LA QUITAMOS DE ESTE DOCUMENTO POR SI MODIFICÁRAMOS EN ALGÚN MOMENTO LA MISMA DURANTE EL DESARROLLO DE ALGUNO DE LOS PROYECTOS FUTUROS DEL CURSO
                </p>
            </div>
        </div>
    );
};

export default About;
