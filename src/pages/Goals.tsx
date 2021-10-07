const Goals = () => {
    return (
    <div className="main-content block">
        <h1 className="main-heading">Sport goals</h1>
        <select>
          <option>Jumps</option>
          <option>Steps</option>
          <option>Spins</option>
        </select>
        <select>
          <option>Done</option>
          <option>Not done</option>
        </select>
        <section className="goals-container">
          <article className="goal">
            <h2>Waltz jump</h2>
            <p>Created: 01.06.2021</p>
            <p>Deadline: 05.06.2021</p>
            <p>Add more speed. Don't be afraid to fall</p>
            <p><input type="checkbox"/> Done</p>
          </article>
          <article className="goal">
            <h2>Waltz jump</h2>
            <p>Created: 01.06.2021</p>
            <p>Deadline: 05.06.2021</p>
            <p>Add more speed. Don't be afraid to fall</p>
            <p><input type="checkbox"/> Not done</p>
          </article>
          <article className="goal">
            <h2>Waltz jump</h2>
            <p>Created: 01.06.2021</p>
            <p>Deadline: 05.06.2021 <span style={{display: 'none'}}>нельзя изменить</span></p>
            <p>Add more speed. Don't be afraid to fall</p>
            <p><input type="checkbox"/> Not done</p>
          </article>
          <article style={{display: 'none'}} className="goal">
            <input type="text" value="Waltz jump" />
            <textarea>
              Add more speed. Don't be afraid to fall
            </textarea>
            <select>
              <option selected>Done</option>
              <option>In progress</option>
              <option>Pechal</option>
            </select>
          </article>
        </section>
    </div>
    );
};

export default Goals;